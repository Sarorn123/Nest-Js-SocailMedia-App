import { IsNotEmpty, MaxLength } from 'class-validator';

export class UserSignupDto {
  @IsNotEmpty({ message: 'fullname is require !' })
  @MaxLength(255)
  fullname: string;

  @IsNotEmpty({ message: 'email_or_phone is require !' })
  @MaxLength(255)
  email_or_phone: string;

  @IsNotEmpty({ message: 'password is require !' })
  @MaxLength(255)
  password: string;

  @IsNotEmpty({ message: 'confirm password is require !' })
  @MaxLength(255)
  confirm_password: string;
}
