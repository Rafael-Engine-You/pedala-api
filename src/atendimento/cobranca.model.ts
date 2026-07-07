import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AtendimentoModel } from './atendimento.model';
import { CobrancaStatus } from './cobranca-status.enum';
import { ClinicaModel } from './clinica.model';
import { MedicoModel } from './medico.model';
import { PacienteModel } from './paciente.model';

@Entity('cobrancas')
export class CobrancaModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'atendimento_id', nullable: true })
  atendimentoId?: string;

  @ManyToOne(() => AtendimentoModel)
  @JoinColumn({ name: 'atendimento_id' })
  atendimento?: AtendimentoModel;

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

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  valor: string;

  @Column({ name: 'vencimento_em', type: 'timestamptz' })
  vencimentoEm: Date;

  @Column({ name: 'liberado_resgate_em', type: 'timestamptz', nullable: true })
  liberadoResgateEm?: Date;

  @Column({
    type: 'enum',
    enum: CobrancaStatus,
    default: CobrancaStatus.PENDENTE,
  })
  status: CobrancaStatus;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}
