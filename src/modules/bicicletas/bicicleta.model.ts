import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { StatusEstacao } from "./status_estacao.enum"
import { ModeloModel } from "../modelo/modelo.model"
import { EstacaoModel } from "../estacoes/estacao.model"

@Entity("bicicletas")
export class BicicletaModel {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @ManyToOne(() => ModeloModel)
    @JoinColumn({ name: "modelo_id" })
    modelo: ModeloModel
 
    @Column({
        type: 'enum',
        enum: StatusEstacao, 
        default: StatusEstacao.DISPONIVEL})
    status: StatusEstacao

    @ManyToOne(() => EstacaoModel)
    @JoinColumn({name: "estacao_id"})
    lotacao: EstacaoModel

    @CreateDateColumn({ name: "dt_cadastro", update: false})
    dataCadastro: Date

    @UpdateDateColumn({ name: "dt_atualizacao", update: true})
    dataDeAtualizacao: Date
}