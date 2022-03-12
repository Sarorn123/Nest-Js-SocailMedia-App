import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class AddStoryDto {
  @IsOptional()
  userId: string;

  @IsNotEmpty()
  @MaxLength(1000)
  image_url: string;
}
