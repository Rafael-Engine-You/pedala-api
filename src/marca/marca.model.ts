import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("marcas")
export class MarcaModel {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ name: "nome" })
    nomeMarca: string
}