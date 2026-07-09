import { MigrationInterface, QueryRunner } from "typeorm";

export class CriarTabelaEstacoes1783601332120 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS estacoes(
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                nm_estacao VARCHAR(150) NOT NULL UNIQUE,
                capacidade INTEGER NOT NULL DEFAULT 1,
                ativa BOOLEAN NOT NULL DEFAULT false,
                dt_criacao TIMESTAMP DEFAULT 'now()'
            )        
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('estacoes')
    }

}
