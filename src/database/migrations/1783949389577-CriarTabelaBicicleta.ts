import { MigrationInterface, QueryRunner } from "typeorm";

export class CriarTabelaBicicleta1783949389577 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS bicicletas(
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                modelo_id UUID NOT NULL,
                status VARCHAR(20) NOT NULL DEFAULT 'DISPONIVEL',
                estacao_id UUID NOT NULL,
                dt_cadastro DATE NOT NULL DEFAULT 'now()',
                dt_atualizacao TIMESTAMP,
                CONSTRAINT fk_modelo_bicicleta FOREIGN KEY (modelo_id) REFERENCES
                    modelos(id) ON UPDATE NO ACTION ON DELETE CASCADE,
                CONSTRAINT fk_bicicleta_estacao FOREIGN KEY (estacao_id) REFERENCES
                    estacoes(id) ON UPDATE NO ACTION ON DELETE CASCADE
            );                
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("bicicletas")
    }

}
