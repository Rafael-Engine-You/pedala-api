import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { UsuarioPapel } from "./papel.enun"

@Entity("usuarios")
export class UsuarioModel {
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    nome: string

    @Column()
    email: string

    @Column({ 
        type: 'enum', 
        enum: UsuarioPapel, 
        default: UsuarioPapel.CLIENTE
    })
    perfil: UsuarioPapel

    @Column()
    senha: string

    @Column()
    contato: string
}