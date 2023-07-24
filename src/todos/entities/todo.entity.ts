import { type } from "os";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "../Enums/status.enum";


@Entity()
export class Todo{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;


    @Column({default: Status.ACTIVE})
    status: Status
}