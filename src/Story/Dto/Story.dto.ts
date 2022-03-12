import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class AddStoryDto {
  @IsOptional()
  userId: string;

  @IsNotEmpty()
  @MaxLength(1000)
  image_url: string;
}

export class EditCommentDto {
  @IsOptional()
  postId: string;

  @IsOptional()
  userId: string;

  @IsOptional()
  @MaxLength(1000)
  body: string;

  @IsOptional()
  is_reply_to: boolean;

  @IsOptional()
  parentId: string;
}
