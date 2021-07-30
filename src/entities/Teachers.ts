import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import Subjects from "./Subjects";

@Entity("teachers")
export default class Teachers {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}