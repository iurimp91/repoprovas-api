import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("exams")
export default class Exam {
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