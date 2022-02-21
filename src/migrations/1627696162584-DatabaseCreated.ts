import {MigrationInterface, QueryRunner} from "typeorm";

export class DatabaseCreated1627696162584 implements MigrationInterface {
    name = 'DatabaseCreated1627696162584'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE DATABASE "repoprovas" && CREATE DATABASE "repoprovas_test"`);
        await queryRunner.query(`CREATE TABLE "teachers" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_a8d4f83be3abe4c687b0a0093c8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subjects" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "period" integer NOT NULL, CONSTRAINT "PK_1a023685ac2b051b4e557b0b280" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "exams" ("id" SERIAL NOT NULL, "year" integer NOT NULL, "semester" integer NOT NULL, "link" character varying NOT NULL, "categoryId" integer, "teacherId" integer, "subjectId" integer, CONSTRAINT "PK_b43159ee3efa440952794b4f53e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "teachers_subjects_subjects" ("teachersId" integer NOT NULL, "subjectsId" integer NOT NULL, CONSTRAINT "PK_aad960b3f7d068c59c0181460e8" PRIMARY KEY ("teachersId", "subjectsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_881ae84e059f2d51ce60ea8d60" ON "teachers_subjects_subjects" ("teachersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4afd1f51df48493ea92f3e62a8" ON "teachers_subjects_subjects" ("subjectsId") `);
        await queryRunner.query(`CREATE TABLE "subjects_teachers_teachers" ("subjectsId" integer NOT NULL, "teachersId" integer NOT NULL, CONSTRAINT "PK_a4cd768e43d499d55f28ec992a4" PRIMARY KEY ("subjectsId", "teachersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5277f266ba42ba3daf25718e85" ON "subjects_teachers_teachers" ("subjectsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9be8d621d037fc355e4dbfea42" ON "subjects_teachers_teachers" ("teachersId") `);
        await queryRunner.query(`ALTER TABLE "exams" ADD CONSTRAINT "FK_a4b572eed2e7293985b93a55eb3" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exams" ADD CONSTRAINT "FK_698b8b125b1bf0e0d4a38bee303" FOREIGN KEY ("teacherId") REFERENCES "teachers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exams" ADD CONSTRAINT "FK_1dc4dcc3e975e1378e9d235cd1c" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teachers_subjects_subjects" ADD CONSTRAINT "FK_881ae84e059f2d51ce60ea8d604" FOREIGN KEY ("teachersId") REFERENCES "teachers"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "teachers_subjects_subjects" ADD CONSTRAINT "FK_4afd1f51df48493ea92f3e62a82" FOREIGN KEY ("subjectsId") REFERENCES "subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "subjects_teachers_teachers" ADD CONSTRAINT "FK_5277f266ba42ba3daf25718e850" FOREIGN KEY ("subjectsId") REFERENCES "subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "subjects_teachers_teachers" ADD CONSTRAINT "FK_9be8d621d037fc355e4dbfea42e" FOREIGN KEY ("teachersId") REFERENCES "teachers"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subjects_teachers_teachers" DROP CONSTRAINT "FK_9be8d621d037fc355e4dbfea42e"`);
        await queryRunner.query(`ALTER TABLE "subjects_teachers_teachers" DROP CONSTRAINT "FK_5277f266ba42ba3daf25718e850"`);
        await queryRunner.query(`ALTER TABLE "teachers_subjects_subjects" DROP CONSTRAINT "FK_4afd1f51df48493ea92f3e62a82"`);
        await queryRunner.query(`ALTER TABLE "teachers_subjects_subjects" DROP CONSTRAINT "FK_881ae84e059f2d51ce60ea8d604"`);
        await queryRunner.query(`ALTER TABLE "exams" DROP CONSTRAINT "FK_1dc4dcc3e975e1378e9d235cd1c"`);
        await queryRunner.query(`ALTER TABLE "exams" DROP CONSTRAINT "FK_698b8b125b1bf0e0d4a38bee303"`);
        await queryRunner.query(`ALTER TABLE "exams" DROP CONSTRAINT "FK_a4b572eed2e7293985b93a55eb3"`);
        await queryRunner.query(`DROP INDEX "IDX_9be8d621d037fc355e4dbfea42"`);
        await queryRunner.query(`DROP INDEX "IDX_5277f266ba42ba3daf25718e85"`);
        await queryRunner.query(`DROP TABLE "subjects_teachers_teachers"`);
        await queryRunner.query(`DROP INDEX "IDX_4afd1f51df48493ea92f3e62a8"`);
        await queryRunner.query(`DROP INDEX "IDX_881ae84e059f2d51ce60ea8d60"`);
        await queryRunner.query(`DROP TABLE "teachers_subjects_subjects"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "exams"`);
        await queryRunner.query(`DROP TABLE "subjects"`);
        await queryRunner.query(`DROP TABLE "teachers"`);
    }

}
