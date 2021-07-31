import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from "typeorm";
import Exams from "./Exams";
import Subjects from "./Subjects";

@Entity("teachers")
export default class Teachers {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Exams, exam => exam.teacher)
    exams: Exams[];

    @ManyToMany(() => Subjects)
    @JoinTable()
    subjects: Subjects[];
}