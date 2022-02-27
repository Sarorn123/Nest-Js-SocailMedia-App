import { IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

export class UserSignupDto {
  @IsNotEmpty({ message: 'fullname is require !' })
  @MaxLength(255)
  fullname: string;

  @IsNotEmpty({ message: 'gender is require !' })
  gender: number;

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

export class UpdateUserDto {
  @IsOptional()
  @MaxLength(255)
  fullname: string;

  @IsOptional()
  @MaxLength(255)
  email_or_phone: string;

  @IsOptional()
  @MaxLength(255)
  password: string;

  @IsOptional()
  @MaxLength(255)
  confirm_password: string;

  @IsOptional()
  @MaxLength(500)
  profile_picture: string;

  @IsOptional()
  @MaxLength(500)
  cover_picture: string;

  @IsOptional()
  @MaxLength(500)
  photos_or_videos: [string];
}
