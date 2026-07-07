import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AtendimentoStatus } from './atendimento-status.enum';
import { ClinicaModel } from './clinica.model';
import { MedicoModel } from './medico.model';
import { PacienteModel } from './paciente.model';

@Entity('atendimentos')
export class AtendimentoModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'paciente_id' })
  pacienteId: string;

  @ManyToOne(() => PacienteModel)
  @JoinColumn({ name: 'paciente_id' })
  paciente: PacienteModel;

  @Column({ name: 'medico_id' })
  medicoId: string;

  @ManyToOne(() => MedicoModel)
  @JoinColumn({ name: 'medico_id' })
  medico: MedicoModel;

  @Column({ name: 'clinica_id' })
  clinicaId: string;

  @ManyToOne(() => ClinicaModel)
  @JoinColumn({ name: 'clinica_id' })
  clinica: ClinicaModel;

  @Column({ name: 'data_hora', type: 'timestamptz' })
  dataHora: Date;

  @Column({
    type: 'enum',
    enum: AtendimentoStatus,
    default: AtendimentoStatus.AGENDADO,
  })
  status: AtendimentoStatus;

  @Column({ name: 'informacoes_paciente', type: 'text', nullable: true })
  informacoesPaciente?: string;

  @Column({ name: 'iniciado_em', type: 'timestamptz', nullable: true })
  iniciadoEm?: Date;

  @Column({ name: 'encerrado_em', type: 'timestamptz', nullable: true })
  encerradoEm?: Date;

  @Column({ name: 'atendimento_origem_id', nullable: true })
  atendimentoOrigemId?: string;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}
