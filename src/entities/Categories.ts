import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("categories")
export default class Categories {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}