import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('clinicas')
export class ClinicaModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column({ name: 'ativa', default: true })
  ativa: boolean;
}
