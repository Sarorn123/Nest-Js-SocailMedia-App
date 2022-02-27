import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class AddCommentDto {
  @IsNotEmpty()
  postId: string;

  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  @MaxLength(1000)
  body: string;

  @IsOptional()
  is_reply_to: Boolean;

  @IsOptional()
  parentId: string;
}
