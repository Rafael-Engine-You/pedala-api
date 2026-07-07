import { BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AtendimentoStatus } from './atendimento-status.enum';
import { AtendimentoModel } from './atendimento.model';
import { AtendimentoService } from './atendimento.service';
import { CobrancaModel } from './cobranca.model';

class FakeRepository<T extends { id?: string }> {
  public items: T[];
  public saved: T[] = [];

  constructor(items: T[] = []) {
    this.items = items;
  }

  findOne = jest.fn(({ where }: { where: { id: string } }) =>
    Promise.resolve(this.items.find((item) => item.id === where.id) ?? null),
  );

  create = jest.fn((data: Partial<T>) => {
    return { id: `novo-${this.saved.length + 1}`, ...data } as T;
  });

  save = jest.fn((item: T) => {
    this.saved.push(item);
    const index = this.items.findIndex((existing) => existing.id === item.id);
    if (index >= 0) {
      this.items[index] = item;
    } else {
      this.items.push(item);
    }
    return Promise.resolve(item);
  });
}

const repositorio = <T extends { id?: string }>(items: T[] = []) =>
  new FakeRepository<T>(items) as unknown as Repository<T>;

describe('AtendimentoService', () => {
  const dataHora = new Date('2026-07-07T13:00:00.000Z');
  const atendimentoBase = (): AtendimentoModel =>
    ({
      id: 'atendimento-1',
      pacienteId: 'paciente-1',
      medicoId: 'medico-1',
      clinicaId: 'clinica-1',
      dataHora,
      status: AtendimentoStatus.AGENDADO,
      paciente: {
        id: 'paciente-1',
        cpf: '12345678900',
        nomeCompleto: 'Maria Silva',
        dataNascimento: '1990-05-20',
      },
    }) as AtendimentoModel;

  it('exibe o atendimento sem alterar o status', async () => {
    const atendimento = atendimentoBase();
    const atendimentos = repositorio<AtendimentoModel>([atendimento]);
    const service = new AtendimentoService(
      atendimentos,
      repositorio<CobrancaModel>(),
    );

    const resposta = await service.exibirAtendimento('atendimento-1');

    expect(resposta.status).toBe(AtendimentoStatus.AGENDADO);
    expect(atendimento.status).toBe(AtendimentoStatus.AGENDADO);
    expect(
      (atendimentos as unknown as FakeRepository<AtendimentoModel>).save,
    ).not.toHaveBeenCalled();
  });

  it('inicia o atendimento somente no horário cadastrado até 15 minutos depois', async () => {
    const atendimento = atendimentoBase();
    const atendimentos = repositorio<AtendimentoModel>([atendimento]);
    const service = new AtendimentoService(
      atendimentos,
      repositorio<CobrancaModel>(),
    );

    const resposta = await service.iniciarAtendimento(
      'atendimento-1',
      new Date('2026-07-07T13:10:00.000Z'),
    );

    expect(resposta.status).toBe(AtendimentoStatus.EM_ATENDIMENTO);
    expect(atendimento.iniciadoEm).toEqual(
      new Date('2026-07-07T13:10:00.000Z'),
    );
  });

  it('bloqueia início antes do horário cadastrado', async () => {
    const service = new AtendimentoService(
      repositorio<AtendimentoModel>([atendimentoBase()]),
      repositorio<CobrancaModel>(),
    );

    await expect(
      service.iniciarAtendimento(
        'atendimento-1',
        new Date('2026-07-07T12:59:59.000Z'),
      ),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('bloqueia início após a tolerância de 15 minutos', async () => {
    const service = new AtendimentoService(
      repositorio<AtendimentoModel>([atendimentoBase()]),
      repositorio<CobrancaModel>(),
    );

    await expect(
      service.iniciarAtendimento(
        'atendimento-1',
        new Date('2026-07-07T13:16:00.000Z'),
      ),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('encerra atendimento criando retorno gratuito na agenda ativa', async () => {
    const atendimento = atendimentoBase();
    atendimento.status = AtendimentoStatus.EM_ATENDIMENTO;
    const atendimentos = repositorio<AtendimentoModel>([atendimento]);
    const cobrancasFake = new FakeRepository<CobrancaModel>();
    const service = new AtendimentoService(
      atendimentos,
      cobrancasFake as unknown as Repository<CobrancaModel>,
    );

    const resposta = await service.encerrarAtendimento('atendimento-1', {
      informacoesPaciente: '<p>Paciente estável</p>',
      teraRetorno: true,
      dataHoraRetorno: '2026-07-14T13:00:00.000Z',
      retornoCobrado: false,
    });

    expect(resposta.atendimento.status).toBe(AtendimentoStatus.ATENDIDO);
    expect(resposta.retorno?.status).toBe(AtendimentoStatus.AGENDADO);
    expect(resposta.cobranca).toBeNull();
    expect(cobrancasFake.save).not.toHaveBeenCalled();
  });

  it('encerra atendimento criando retorno e cobrança dois dias antes', async () => {
    const atendimento = atendimentoBase();
    atendimento.status = AtendimentoStatus.EM_ATENDIMENTO;
    const cobrancasFake = new FakeRepository<CobrancaModel>();
    const service = new AtendimentoService(
      repositorio<AtendimentoModel>([atendimento]),
      cobrancasFake as unknown as Repository<CobrancaModel>,
    );

    const resposta = await service.encerrarAtendimento('atendimento-1', {
      teraRetorno: true,
      dataHoraRetorno: '2026-07-14T13:00:00.000Z',
      retornoCobrado: true,
      valorCobranca: 150,
    });

    expect(resposta.cobranca?.valor).toBe(150);
    expect(cobrancasFake.saved[0].vencimentoEm).toEqual(
      new Date('2026-07-12T13:00:00.000Z'),
    );
  });
});
