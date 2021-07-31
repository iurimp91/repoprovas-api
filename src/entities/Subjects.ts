import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from "typeorm";
import Teachers from "./Teachers";
import Exams from "./Exams";

@Entity("subjects")
export default class Subjects {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    period: string;

    @OneToMany(() => Exams, exam => exam.subject)
    exams: Exams[];

    @ManyToMany(() => Teachers)
    @JoinTable()
    teachers: Teachers[];
}