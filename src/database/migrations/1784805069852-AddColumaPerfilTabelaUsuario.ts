import { UsuarioPapel } from "src/usuario/papel.enun";
import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumaPerfilTabelaUsuario1784805069852 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.addColumn('usuarios', 
        //     new TableColumn({
        //         name: "perfil",
        //         type: "varchar",
        //         length: "20",
        //         isNullable: false,
        //         default: UsuarioPapel.CLIENTE
        //     }))
        await queryRunner.query(`
            ALTER TABLE usuarios ADD COLUMN perfil VARCHAR(20) 
                NOT NULL DEFAULT 'CLIENTE';
                    
            ALTER TABLE usuarios ADD COLUMN senha VARCHAR(150) 
                NOT NULL;    
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("usuarios", "perfil", true)
        await queryRunner.dropColumn("usuarios", "senha", true)
    }

}
