import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("subjects")
export default class Subjects {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}