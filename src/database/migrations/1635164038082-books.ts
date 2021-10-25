import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTableBooks1635164038082 implements MigrationInterface {
  name = 'books1635164038082';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "books" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "name" character varying,
        "is_bestseller" boolean,
        "author" character varying,
        "pages" integer,
        "genre" character varying,
        "picture" character varying,
        "description" character varying,
        "price" integer,
        CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "books"');
  }
}
