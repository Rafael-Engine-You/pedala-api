import { MigrationInterface, QueryRunner } from "typeorm";

export class CriarTabelaManuntencao1784892161396 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS manutencoes(
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                bicicleta_id UUID NOT NULL,
                tecnico_id UUID,
                responsavel_id UUID NOT NULL,
                descricao TEXT NOT NULL,
                observacoes TEXT,
                status VARCHAR(20) NOT NULL DEFAULT 'AGUARDANDO',
                dt_abertura DATE NOT NULL DEFAULT 'now()',
                dt_atualizacao TIMESTAMP,
                dt_finalizado TIMESTAMP,
                CONSTRAINT fk_manutencao_bicicleta FOREIGN KEY (bicicleta_id) REFERENCES
                    bicicletas(id) ON UPDATE NO ACTION ON DELETE CASCADE,
                CONSTRAINT fk_manutencao_tecnico FOREIGN KEY (tecnico_id) REFERENCES
                    usuarios(id) ON UPDATE NO ACTION ON DELETE CASCADE,
                CONSTRAINT fk_manutencao_responsavel FOREIGN KEY (responsavel_id) REFERENCES
                    usuarios(id) ON UPDATE NO ACTION ON DELETE CASCADE
            );                
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
