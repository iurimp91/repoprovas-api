import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("teachers")
export default class Teachers {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}