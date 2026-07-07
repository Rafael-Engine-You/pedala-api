import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateHealthcareFlow1783434900000 implements MigrationInterface {
  name = 'CreateHealthcareFlow1783434900000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'atendimento_status_enum') THEN
          CREATE TYPE atendimento_status_enum AS ENUM ('AGENDADO', 'EM_ATENDIMENTO', 'ATENDIDO', 'CANCELADO');
        END IF;
      END
      $$;
    `);
    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'cobranca_status_enum') THEN
          CREATE TYPE cobranca_status_enum AS ENUM ('PENDENTE', 'PAGO', 'CANCELADO');
        END IF;
      END
      $$;
    `);
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS pacientes (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        cpf varchar NOT NULL UNIQUE,
        nome_completo varchar NOT NULL,
        data_nascimento date NOT NULL
      )
    `);
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS clinicas (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        nome varchar NOT NULL,
        ativa boolean NOT NULL DEFAULT true
      )
    `);
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS medicos (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        nome varchar NOT NULL,
        crm varchar
      )
    `);
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS atendimentos (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        paciente_id uuid NOT NULL REFERENCES pacientes(id),
        medico_id uuid NOT NULL REFERENCES medicos(id),
        clinica_id uuid NOT NULL REFERENCES clinicas(id),
        data_hora timestamptz NOT NULL,
        status atendimento_status_enum NOT NULL DEFAULT 'AGENDADO',
        informacoes_paciente text,
        iniciado_em timestamptz,
        encerrado_em timestamptz,
        atendimento_origem_id uuid REFERENCES atendimentos(id),
        criado_em timestamptz NOT NULL DEFAULT now(),
        atualizado_em timestamptz NOT NULL DEFAULT now()
      )
    `);
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS cobrancas (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        atendimento_id uuid REFERENCES atendimentos(id),
        paciente_id uuid NOT NULL REFERENCES pacientes(id),
        medico_id uuid NOT NULL REFERENCES medicos(id),
        clinica_id uuid NOT NULL REFERENCES clinicas(id),
        valor numeric(12, 2) NOT NULL,
        vencimento_em timestamptz NOT NULL,
        liberado_resgate_em timestamptz,
        status cobranca_status_enum NOT NULL DEFAULT 'PENDENTE',
        criado_em timestamptz NOT NULL DEFAULT now(),
        atualizado_em timestamptz NOT NULL DEFAULT now()
      )
    `);
    await queryRunner.query(
      "UPDATE atendimentos SET status = 'AGENDADO', iniciado_em = NULL WHERE status = 'EM_ATENDIMENTO'",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS cobrancas');
    await queryRunner.query('DROP TABLE IF EXISTS atendimentos');
    await queryRunner.query('DROP TABLE IF EXISTS medicos');
    await queryRunner.query('DROP TABLE IF EXISTS clinicas');
    await queryRunner.query('DROP TABLE IF EXISTS pacientes');
    await queryRunner.query('DROP TYPE IF EXISTS cobranca_status_enum');
    await queryRunner.query('DROP TYPE IF EXISTS atendimento_status_enum');
  }
}
