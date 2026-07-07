import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pacientes')
export class PacienteModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  cpf: string;

  @Column({ name: 'nome_completo' })
  nomeCompleto: string;

  @Column({ name: 'data_nascimento', type: 'date' })
  dataNascimento: string;
}
