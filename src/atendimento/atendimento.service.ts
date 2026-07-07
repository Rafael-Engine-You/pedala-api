import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AtendimentoStatus } from './atendimento-status.enum';
import { AtendimentoModel } from './atendimento.model';
import { CobrancaStatus } from './cobranca-status.enum';
import { CobrancaModel } from './cobranca.model';
import { EncerrarAtendimentoDto } from './dto/encerrar-atendimento.dto';

const TOLERANCIA_INICIO_MINUTOS = 15;

@Injectable()
export class AtendimentoService {
  constructor(
    @InjectRepository(AtendimentoModel)
    private readonly atendimentos: Repository<AtendimentoModel>,
    @InjectRepository(CobrancaModel)
    private readonly cobrancas: Repository<CobrancaModel>,
  ) {}

  async exibirAtendimento(id: string) {
    const atendimento = await this.buscarAtendimentoCompleto(id);
    return this.serializarAtendimento(atendimento);
  }

  async formularioAtendimento(id: string) {
    const atendimento = await this.buscarAtendimentoCompleto(id);

    return {
      atendimentoId: atendimento.id,
      status: atendimento.status,
      paciente: {
        cpf: atendimento.paciente.cpf,
        nomeCompleto: atendimento.paciente.nomeCompleto,
        idade: this.calcularIdade(atendimento.paciente.dataNascimento),
        bloqueadoParaEdicao: true,
      },
      informacoesPaciente: atendimento.informacoesPaciente ?? '',
      editor: {
        campo: 'informacoesPaciente',
        tipo: 'textarea-rich-text',
      },
    };
  }

  async iniciarAtendimento(id: string, agora = new Date()) {
    const atendimento = await this.buscarAtendimentoCompleto(id);

    if (atendimento.status !== AtendimentoStatus.AGENDADO) {
      throw new BadRequestException(
        'Somente atendimentos agendados podem ser iniciados.',
      );
    }

    if (!this.estaNaJanelaDeInicio(atendimento.dataHora, agora)) {
      throw new BadRequestException(
        'O atendimento só pode ser iniciado no horário cadastrado, com tolerância de 15 minutos após o horário.',
      );
    }

    atendimento.status = AtendimentoStatus.EM_ATENDIMENTO;
    atendimento.iniciadoEm = agora;

    const salvo = await this.atendimentos.save(atendimento);
    return this.serializarAtendimento(salvo);
  }

  async encerrarAtendimento(id: string, dto: EncerrarAtendimentoDto) {
    const atendimento = await this.buscarAtendimentoCompleto(id);

    if (atendimento.status !== AtendimentoStatus.EM_ATENDIMENTO) {
      throw new BadRequestException(
        'Somente atendimentos em andamento podem ser encerrados.',
      );
    }

    if (dto.teraRetorno && !dto.dataHoraRetorno) {
      throw new BadRequestException(
        'Informe a data e horário do próximo retorno.',
      );
    }

    if (dto.teraRetorno && dto.retornoCobrado && !dto.valorCobranca) {
      throw new BadRequestException('Informe o valor da cobrança do retorno.');
    }

    atendimento.status = AtendimentoStatus.ATENDIDO;
    atendimento.informacoesPaciente = dto.informacoesPaciente;
    atendimento.encerradoEm = new Date();

    const atendimentoEncerrado = await this.atendimentos.save(atendimento);
    const retorno = dto.teraRetorno
      ? await this.criarRetorno(atendimentoEncerrado, dto)
      : null;
    const cobranca =
      retorno && dto.retornoCobrado
        ? await this.criarCobrancaRetorno(retorno, dto.valorCobranca ?? 0)
        : null;

    return {
      atendimento: this.serializarAtendimento(atendimentoEncerrado),
      retorno: retorno ? this.serializarAtendimento(retorno) : null,
      cobranca: cobranca ? this.serializarCobranca(cobranca) : null,
    };
  }

  private async criarRetorno(
    atendimento: AtendimentoModel,
    dto: EncerrarAtendimentoDto,
  ) {
    const retorno = this.atendimentos.create({
      pacienteId: atendimento.pacienteId,
      medicoId: atendimento.medicoId,
      clinicaId: atendimento.clinicaId,
      dataHora: new Date(dto.dataHoraRetorno as string),
      status: AtendimentoStatus.AGENDADO,
      atendimentoOrigemId: atendimento.id,
    });

    return this.atendimentos.save(retorno);
  }

  private async criarCobrancaRetorno(
    retorno: AtendimentoModel,
    valorCobranca: number,
  ) {
    const vencimentoEm = new Date(retorno.dataHora);
    vencimentoEm.setDate(vencimentoEm.getDate() - 2);

    const cobranca = this.cobrancas.create({
      atendimentoId: retorno.id,
      pacienteId: retorno.pacienteId,
      medicoId: retorno.medicoId,
      clinicaId: retorno.clinicaId,
      valor: valorCobranca.toFixed(2),
      vencimentoEm,
      status: CobrancaStatus.PENDENTE,
    });

    return this.cobrancas.save(cobranca);
  }

  private async buscarAtendimentoCompleto(id: string) {
    const atendimento = await this.atendimentos.findOne({
      where: { id },
      relations: {
        paciente: true,
        medico: true,
        clinica: true,
      },
    });

    if (!atendimento) {
      throw new NotFoundException('Atendimento não encontrado.');
    }

    return atendimento;
  }

  private estaNaJanelaDeInicio(dataHora: Date, agora: Date) {
    const inicio = dataHora.getTime();
    const fim = inicio + TOLERANCIA_INICIO_MINUTOS * 60 * 1000;
    const atual = agora.getTime();

    return atual >= inicio && atual <= fim;
  }

  private calcularIdade(dataNascimento: string) {
    const nascimento = new Date(`${dataNascimento}T00:00:00`);
    const hoje = new Date();
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const aniversarioJaPassou =
      hoje.getMonth() > nascimento.getMonth() ||
      (hoje.getMonth() === nascimento.getMonth() &&
        hoje.getDate() >= nascimento.getDate());

    if (!aniversarioJaPassou) {
      idade -= 1;
    }

    return idade;
  }

  private serializarAtendimento(atendimento: AtendimentoModel) {
    return {
      id: atendimento.id,
      status: atendimento.status,
      dataHora: atendimento.dataHora,
      paciente: atendimento.paciente
        ? {
            cpf: atendimento.paciente.cpf,
            nomeCompleto: atendimento.paciente.nomeCompleto,
          }
        : undefined,
      medicoId: atendimento.medicoId,
      clinicaId: atendimento.clinicaId,
      informacoesPaciente: atendimento.informacoesPaciente ?? null,
    };
  }

  private serializarCobranca(cobranca: CobrancaModel) {
    return {
      id: cobranca.id,
      atendimentoId: cobranca.atendimentoId,
      valor: Number(cobranca.valor),
      vencimentoEm: cobranca.vencimentoEm,
      status: cobranca.status,
    };
  }
}
