import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { MarcaModel } from '../marca/marca.model'

@Entity("modelos")
export class ModeloModel {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ name: "nome" })
    nomeModelo: string
    
    @ManyToOne(() => MarcaModel)
    @JoinColumn({ name: "marca_id"})
    marca: MarcaModel
}