import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AtendimentoService } from './atendimento.service';
import { EncerrarAtendimentoDto } from './dto/encerrar-atendimento.dto';
import { IniciarAtendimentoDto } from './dto/iniciar-atendimento.dto';

@Controller('atendimentos')
export class AtendimentoController {
  constructor(private readonly atendimentoService: AtendimentoService) {}

  @Get(':id')
  exibirAtendimento(@Param('id') id: string) {
    return this.atendimentoService.exibirAtendimento(id);
  }

  @Get(':id/formulario')
  formularioAtendimento(@Param('id') id: string) {
    return this.atendimentoService.formularioAtendimento(id);
  }

  @Post(':id/iniciar')
  iniciarAtendimento(
    @Param('id') id: string,
    @Body() dto: IniciarAtendimentoDto,
  ) {
    return this.atendimentoService.iniciarAtendimento(
      id,
      dto.agora ? new Date(dto.agora) : new Date(),
    );
  }

  @Post(':id/encerrar')
  encerrarAtendimento(
    @Param('id') id: string,
    @Body() dto: EncerrarAtendimentoDto,
  ) {
    return this.atendimentoService.encerrarAtendimento(id, dto);
  }
}
