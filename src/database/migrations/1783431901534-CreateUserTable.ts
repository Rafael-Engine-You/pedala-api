import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1783431901534 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            create table if not exists usuarios(
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                nome VARCHAR(150) NOT NULL,
                email VARCHAR(150) NOT NULL UNIQUE,
                contato VARCHAR(20)
            );    
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('usuarios')
    }

}
