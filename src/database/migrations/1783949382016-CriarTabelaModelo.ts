import { MigrationInterface, QueryRunner } from "typeorm";

export class CriarTabelaModelo1783949382016 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS modelos(
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                nome VARCHAR(150) NOT NULL UNIQUE,
                marca_id UUID NOT NULL,
                CONSTRAINT fk_marca_modelo FOREIGN KEY (marca_id) REFERENCES
                    marcas(id) ON UPDATE NO ACTION ON DELETE CASCADE
            );                
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("modelos")
    }
}
