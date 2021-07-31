import {MigrationInterface, QueryRunner} from "typeorm";

export class SubjectPeriodTypeToStringAndPopulateDatabase1627696683779 implements MigrationInterface {
    name = 'SubjectPeriodTypeToStringAndPopulateDatabase1627696683779'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subjects" DROP COLUMN "period"`);
        await queryRunner.query(`ALTER TABLE "subjects" ADD "period" character varying NOT NULL`);
        await queryRunner.query(`INSERT INTO categories (name) VALUES ('P1'), ('P2'), ('P3'), ('2ch'), ('Outras')`);
        await queryRunner.query(`INSERT INTO teachers (name) VALUES ('Iuri Magnago'), ('André Amaral'), ('Maurício Gomes'), ('Newton Oliveira'), ('Neymar Junior')`);
        await queryRunner.query(`INSERT INTO subjects (name, period) VALUES ('Informática 1', '1'), ('Informática 2', '2'), ('Física 1', '1'), ('Física 2', '2'), ('Cálculo 1', '1'),  ('Cálculo 2', '2'), ('Mecânica Vetorial', '3'), ('Ousadia e Alegria', 'Eletiva')`);
        await queryRunner.query(`INSERT INTO subjects_teachers_teachers ("subjectsId", "teachersId") VALUES (8, 1), (7, 1), (1, 2), (2, 2), (3, 3), (4, 3), (5, 4), (6, 4), (7, 2), (7, 3), (8, 5)`);
        await queryRunner.query(`INSERT INTO teachers_subjects_subjects ("teachersId", "subjectsId") VALUES (1, 8), (1, 7), (2, 1), (2, 2), (3, 3), (3, 4), (4, 5), (4, 6), (2, 7), (3, 7), (5, 8)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subjects" DROP COLUMN "period"`);
        await queryRunner.query(`ALTER TABLE "subjects" ADD "period" integer NOT NULL`);
    }

}
