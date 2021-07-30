import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateCategoriesExamSubjectsAndTeachers1627660387966 implements MigrationInterface {
    name = 'CreateCategoriesExamSubjectsAndTeachers1627660387966'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "exams" ("id" SERIAL NOT NULL, "year" integer NOT NULL, "semester" integer NOT NULL, "categoryId" integer NOT NULL, "subjectId" integer NOT NULL, "teacherId" integer NOT NULL, "link" character varying NOT NULL, CONSTRAINT "PK_b43159ee3efa440952794b4f53e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "teachers" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_a8d4f83be3abe4c687b0a0093c8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subjects" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "period" character varying NOT NULL, CONSTRAINT "PK_1a023685ac2b051b4e557b0b280" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subjects_teachers_teachers" ("subjectsId" integer NOT NULL, "teachersId" integer NOT NULL, CONSTRAINT "PK_a4cd768e43d499d55f28ec992a4" PRIMARY KEY ("subjectsId", "teachersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5277f266ba42ba3daf25718e85" ON "subjects_teachers_teachers" ("subjectsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9be8d621d037fc355e4dbfea42" ON "subjects_teachers_teachers" ("teachersId") `);
        await queryRunner.query(`ALTER TABLE "subjects_teachers_teachers" ADD CONSTRAINT "FK_5277f266ba42ba3daf25718e850" FOREIGN KEY ("subjectsId") REFERENCES "subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "subjects_teachers_teachers" ADD CONSTRAINT "FK_9be8d621d037fc355e4dbfea42e" FOREIGN KEY ("teachersId") REFERENCES "teachers"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`INSERT INTO categories (name) VALUES ('P1'), ('P2'), ('P3'), ('2ch'), ('Outras')`);
        await queryRunner.query(`INSERT INTO teachers (name) VALUES ('Iuri Magnago'), ('André Amaral'), ('Maurício Gomes'), ('Newton Oliveira'), ('Neymar Junior')`);
        await queryRunner.query(`INSERT INTO subjects (name, period) VALUES ('Informática 1', '1'), ('Informática 2', '2'), ('Física 1', '1'), ('Física 2', '2'), ('Cálculo 1', '1'),  ('Cálculo 2', '2'), ('Mecânica Vetorial', '3'), ('Ousadia e Alegria', 'Eletiva')`);
        await queryRunner.query(`INSERT INTO subjects_teachers_teachers ("subjectsId", "teachersId") VALUES (8, 1), (7, 1), (1, 2), (2, 2), (3, 3), (4, 3), (5, 4), (6, 4), (7, 2), (7, 3), (8, 5)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subjects_teachers_teachers" DROP CONSTRAINT "FK_9be8d621d037fc355e4dbfea42e"`);
        await queryRunner.query(`ALTER TABLE "subjects_teachers_teachers" DROP CONSTRAINT "FK_5277f266ba42ba3daf25718e850"`);
        await queryRunner.query(`DROP INDEX "IDX_9be8d621d037fc355e4dbfea42"`);
        await queryRunner.query(`DROP INDEX "IDX_5277f266ba42ba3daf25718e85"`);
        await queryRunner.query(`DROP TABLE "subjects_teachers_teachers"`);
        await queryRunner.query(`DROP TABLE "subjects"`);
        await queryRunner.query(`DROP TABLE "teachers"`);
        await queryRunner.query(`DROP TABLE "exams"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
