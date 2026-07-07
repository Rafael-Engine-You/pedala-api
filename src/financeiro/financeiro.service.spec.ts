import { Repository } from 'typeorm';
import { AtendimentoModel } from '../atendimento/atendimento.model';
import { CobrancaStatus } from '../atendimento/cobranca-status.enum';
import { CobrancaModel } from '../atendimento/cobranca.model';
import { FinanceiroService } from './financeiro.service';

describe('FinanceiroService', () => {
  it('retorna cards do mês e totais de resgate', async () => {
    const agora = new Date('2026-07-20T12:00:00.000Z');
    const cobrancas = [
      {
        clinicaId: 'clinica-1',
        status: CobrancaStatus.PAGO,
        valor: '100.00',
        liberadoResgateEm: new Date('2026-07-19T12:00:00.000Z'),
      },
      {
        clinicaId: 'clinica-1',
        status: CobrancaStatus.PAGO,
        valor: '50.00',
        liberadoResgateEm: new Date('2026-07-21T12:00:00.000Z'),
      },
      {
        clinicaId: 'clinica-1',
        status: CobrancaStatus.PENDENTE,
        valor: '70.00',
      },
    ] as CobrancaModel[];
    const countMock = jest
      .fn<Promise<number>, [unknown]>()
      .mockResolvedValueOnce(1)
      .mockResolvedValueOnce(1)
      .mockResolvedValueOnce(1);
    const atendimentosRepository = {
      count: countMock,
    } as Partial<Repository<AtendimentoModel>>;
    const cobrancasRepository = {
      find: jest
        .fn()
        .mockResolvedValueOnce([cobrancas[0]])
        .mockResolvedValueOnce([cobrancas[1], cobrancas[2]]),
    } as Partial<Repository<CobrancaModel>>;
    const service = new FinanceiroService(
      atendimentosRepository as Repository<AtendimentoModel>,
      cobrancasRepository as Repository<CobrancaModel>,
    );

    const resposta = await service.resumoClinica('clinica-1', '2026-07', agora);

    expect(resposta.cards).toEqual({
      totalClientesAgendados: 1,
      totalClientesAtendidos: 1,
      totalClientesCancelados: 1,
    });
    expect(resposta.resgate).toEqual({
      liberado: 100,
      bloqueado: 120,
    });
    expect(countMock).toHaveBeenCalledTimes(3);
  });
});
