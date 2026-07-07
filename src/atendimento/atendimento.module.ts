import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AtendimentoController } from './atendimento.controller';
import { AtendimentoModel } from './atendimento.model';
import { AtendimentoService } from './atendimento.service';
import { ClinicaModel } from './clinica.model';
import { CobrancaModel } from './cobranca.model';
import { MedicoModel } from './medico.model';
import { PacienteModel } from './paciente.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AtendimentoModel,
      CobrancaModel,
      PacienteModel,
      MedicoModel,
      ClinicaModel,
    ]),
  ],
  controllers: [AtendimentoController],
  providers: [AtendimentoService],
  exports: [TypeOrmModule],
})
export class AtendimentoModule {}
