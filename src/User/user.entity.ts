import { IsEmail } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { JoinColumn } from 'typeorm';
import { CreateDateColumn } from 'typeorm';

@Entity()
export class User {
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
  @IsEmail({ unique: true })
  email: string;

  @Column({
    length: 255,
  })
  password: string;

  @Column({
    length: 255,
  })
  phone_number: string;

  @Column({
    length: 255,
  })
  user_type: string;

  @CreateDateColumn()
  created_at: Date;
}
