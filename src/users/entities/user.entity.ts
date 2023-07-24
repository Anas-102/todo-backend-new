import { IsEmail } from "class-validator";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { RefreshToken } from "./refresh_token.entity";



@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @OneToOne(() => RefreshToken, (refresh) => refresh.user)
  refresh: RefreshToken
}