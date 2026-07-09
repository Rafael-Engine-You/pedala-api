import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("usuarios")
export class UsuarioModel {
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    nome: string

    @Column()
    email: string

    @Column()
    contato: string
}