import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { BicicletaModel } from "../bicicletas/bicicleta.model"
import { UsuarioModel } from "../usuario/usuario.model"
import { StatusManutencao } from "./status_manutencao.enum"

@Entity("manutencoes")
export class ManutencaoModel {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => BicicletaModel)
    @JoinColumn({ name: "bicicleta_id"})
    bicicleta: BicicletaModel

    @ManyToOne(() => UsuarioModel)
    @JoinColumn({name: "tecnico_id"})
    tecnico: UsuarioModel // TECNICO

    @ManyToOne(() => UsuarioModel)
    @JoinColumn({name: "responsavel_id"})
    responsavel: UsuarioModel //ADMIN

    @Column({ type: 'text', nullable: false })
    descricao: string
    
    @Column({
        name: "status", 
        type: 'enum', 
        default: StatusManutencao.AGUARDANDO
    })
    statusManutencao: StatusManutencao

    @Column({ type: 'text', nullable: true })
    observacoes: string

    @CreateDateColumn({ name: "dt_abertura", nullable: false, update: false})
    abertaEm: Date

    @UpdateDateColumn({name: "dt_atualizacao", nullable: true, update: true})
    atualizadoEm: Date

    @Column({name: "dt_finalizado", nullable: true})
    finalizadaEm: Date
}