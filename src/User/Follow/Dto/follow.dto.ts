import { IsNotEmpty } from 'class-validator';

export class ActionFollowDto {
  @IsNotEmpty()
  follower_id: string;

  @IsNotEmpty()
  following_id: string;
}
