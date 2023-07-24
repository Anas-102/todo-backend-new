import { type } from "os";
import { Collection, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { JoinAttribute } from "typeorm/query-builder/JoinAttribute";


@Entity()
export class RefreshToken{

    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => User, (user) => user.refresh)
        @JoinColumn()
    user: User

    @Column()
    Token: string

}