import { IsNotEmpty, IsOptional, IsUppercase } from 'class-validator';

export class AddPostDto {
  @IsNotEmpty()
  userId: string;

  @IsOptional()
  caption: string;

  @IsOptional()
  tages: [string];

  @IsNotEmpty()
  @IsUppercase()
  post_status: string;

  @IsOptional()
  image_or_video: [string];
}

export class EditPostDto {
  @IsOptional()
  caption: string;

  @IsOptional()
  tages: [string];

  @IsUppercase()
  post_status: string;

  @IsOptional()
  image_or_video: [string];
}

export class DeletePostDto {
  @IsNotEmpty({ message: 'userId is required!' })
  userId: string;

  @IsNotEmpty({ message: 'postId is required!' })
  postId: string;
}
