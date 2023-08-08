import { MigrationInterface, QueryRunner } from "typeorm";

export class User1691506146999 implements MigrationInterface {
    name = 'User1691506146999'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "version" integer NOT NULL, "createdAt" integer NOT NULL, "updatedAt" integer NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
