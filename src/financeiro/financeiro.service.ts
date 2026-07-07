import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, LessThanOrEqual, MoreThan, Repository } from 'typeorm';
import { AtendimentoStatus } from '../atendimento/atendimento-status.enum';
import { AtendimentoModel } from '../atendimento/atendimento.model';
import { CobrancaStatus } from '../atendimento/cobranca-status.enum';
import { CobrancaModel } from '../atendimento/cobranca.model';

@Injectable()
export class FinanceiroService {
  constructor(
    @InjectRepository(AtendimentoModel)
    private readonly atendimentos: Repository<AtendimentoModel>,
    @InjectRepository(CobrancaModel)
    private readonly cobrancas: Repository<CobrancaModel>,
  ) {}

  async resumoClinica(clinicaId: string, mes?: string, agora = new Date()) {
    const { inicio, fim } = this.intervaloDoMes(mes, agora);

    const [
      totalClientesAgendados,
      totalClientesAtendidos,
      totalClientesCancelados,
      totalResgateLiberado,
      totalResgateBloqueado,
    ] = await Promise.all([
      this.contarAtendimentos(
        clinicaId,
        AtendimentoStatus.AGENDADO,
        inicio,
        fim,
      ),
      this.contarAtendimentos(
        clinicaId,
        AtendimentoStatus.ATENDIDO,
        inicio,
        fim,
      ),
      this.contarAtendimentos(
        clinicaId,
        AtendimentoStatus.CANCELADO,
        inicio,
        fim,
      ),
      this.somarCobrancasLiberadas(clinicaId, agora),
      this.somarCobrancasBloqueadas(clinicaId, agora),
    ]);

    return {
      mes: inicio.toISOString().slice(0, 7),
      cards: {
        totalClientesAgendados,
        totalClientesAtendidos,
        totalClientesCancelados,
      },
      resgate: {
        liberado: totalResgateLiberado,
        bloqueado: totalResgateBloqueado,
      },
    };
  }

  private contarAtendimentos(
    clinicaId: string,
    status: AtendimentoStatus,
    inicio: Date,
    fim: Date,
  ) {
    return this.atendimentos.count({
      where: {
        clinicaId,
        status,
        dataHora: Between(inicio, fim),
      },
    });
  }

  private async somarCobrancasLiberadas(clinicaId: string, agora: Date) {
    const cobrancas = await this.cobrancas.find({
      where: {
        clinicaId,
        status: CobrancaStatus.PAGO,
        liberadoResgateEm: LessThanOrEqual(agora),
      },
    });

    return this.somarValores(cobrancas);
  }

  private async somarCobrancasBloqueadas(clinicaId: string, agora: Date) {
    const cobrancas = await this.cobrancas.find({
      where: [
        {
          clinicaId,
          status: CobrancaStatus.PENDENTE,
        },
        {
          clinicaId,
          status: CobrancaStatus.PAGO,
          liberadoResgateEm: MoreThan(agora),
        },
      ],
    });

    return this.somarValores(cobrancas);
  }

  private somarValores(cobrancas: CobrancaModel[]) {
    return cobrancas.reduce((total, cobranca) => {
      return total + Number(cobranca.valor);
    }, 0);
  }

  private intervaloDoMes(mes: string | undefined, agora: Date) {
    const [ano, mesNumero] = (mes ?? agora.toISOString().slice(0, 7))
      .split('-')
      .map(Number);
    const inicio = new Date(Date.UTC(ano, mesNumero - 1, 1, 0, 0, 0));
    const fim = new Date(Date.UTC(ano, mesNumero, 0, 23, 59, 59, 999));

    return { inicio, fim };
  }
}
