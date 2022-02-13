import { IsEmail } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { JoinColumn } from 'typeorm';
import { User } from '../User/user.entity';
import { CreateDateColumn } from 'typeorm';

@Entity()
export class UserInformation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 255,
  })
  lastname: string;

  @Column({
    length: 255,
  })
  firstname: string;

  @Column({
    length: 255,
  })
  fullname: string;

  @Column({
    length: 255,
  })
  @IsEmail()
  information_email: string;

  @Column({
    length: 255,
  })
  information_phone_number: string;

  @Column({
    length: 255,
  })
  bio: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @CreateDateColumn()
  created_at: Date;
}
