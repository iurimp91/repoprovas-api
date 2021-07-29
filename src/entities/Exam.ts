import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Url } from "url";

@Entity("exams")
export default class ExamInterface {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    year: number;

    @Column()
    semester: number;

    @Column()
    categoryId: number;

    @Column()
    subjectId: number;

    @Column()
    teacherId: number;

    @Column()
    link: string;
}