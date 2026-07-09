import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("estacoes")
export class EstacaoModel {
    @PrimaryGeneratedColumn('uuid')
    id:string
    @Column({name: 'nm_estacao'})
    nomeEstacao:string //nome_estacao
    @Column()
    capacidade:number
    @Column()
    ativa:boolean
    @CreateDateColumn({name: 'dt_criacao'})
    dataCriacao: Date
}