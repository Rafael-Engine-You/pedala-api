import { Controller, Get, Param, Query } from '@nestjs/common';
import { FinanceiroService } from './financeiro.service';

@Controller('clinicas/:clinicaId/financeiro')
export class FinanceiroController {
  constructor(private readonly financeiroService: FinanceiroService) {}

  @Get('resumo')
  resumoClinica(
    @Param('clinicaId') clinicaId: string,
    @Query('mes') mes?: string,
  ) {
    return this.financeiroService.resumoClinica(clinicaId, mes);
  }
}
