import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { CategoriesInterface } from "../interfaces/CategoriesInterface";
import { SubjectsInterface } from "../interfaces/SubjectsInterface";
import { TeachersInterface } from "../interfaces/TeachersInterface";
import Categories from "./Categories";
import Subjects from "./Subjects";
import Teachers from "./Teachers";

@Entity("exams")
export default class Exams {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    year: number;

    @Column()
    semester: number;

    @Column()
    link: string;

    @ManyToOne(() => Categories, category => category.exams)
    category: CategoriesInterface;

    @ManyToOne(() => Teachers, teacher => teacher.exams)
    teacher: TeachersInterface;

    @ManyToOne(() => Subjects, subject => subject.exams)
    subject: SubjectsInterface;
}