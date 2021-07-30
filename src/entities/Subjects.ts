import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import Teachers from "./Teachers";

@Entity("subjects")
export default class Subjects {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    period: string;

    @ManyToMany(() => Teachers)
    @JoinTable()
    teachers: Teachers[];
}