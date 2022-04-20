import { IsNotEmpty, IsOptional, MaxLength, isArray } from 'class-validator';

export class AddTodoDto {
  @IsNotEmpty()
  @MaxLength(1000)
  title: string;

  @IsNotEmpty()
  @MaxLength(1000)
  description: string;

  @IsOptional()
  @MaxLength(1000)
  userId: string;

  @IsOptional()
  @MaxLength(1000)
  parentId: string;

  @IsOptional()
  doned: boolean;
}
