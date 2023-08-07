import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1691438690020 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.createTable(
    //   new Table({
    //     name: 'user',
    //     columns: [
    //       {
    //         name: 'id',
    //         type: 'uuid',
    //         isPrimary: true,
    //         isGenerated: true,
    //         generationStrategy: 'uuid',
    //         isNullable: false,
    //       },
    //       {
    //         name: 'login',
    //         type: 'varchar',
    //         isNullable: false,
    //       },
    //     ],
    //   }),
    // );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" text NOT NULL, "password" text NOT NULL, "version" smallint NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
