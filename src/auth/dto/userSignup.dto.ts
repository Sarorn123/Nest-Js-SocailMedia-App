import { IsNotEmpty, MaxLength } from 'class-validator';

export class UserSignupDto {
  @IsNotEmpty({ message: 'lastname is require !' })
  @MaxLength(255)
  lastname: string;

  @IsNotEmpty({ message: 'firstname is require !' })
  @MaxLength(255)
  firstname: string;

  email: string;

  @IsNotEmpty({ message: 'password is require !' })
  @MaxLength(255)
  password: string;

  @IsNotEmpty({ message: 'confirm password is require !' })
  @MaxLength(255)
  confirm_password: string;

  phone_number: string;
}
