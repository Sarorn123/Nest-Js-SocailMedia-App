import { IsNotEmpty, IsOptional } from 'class-validator';

export class UploadSingleImageDto {
  @IsOptional()
  image_name: string;
}
