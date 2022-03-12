import { Story } from '../story.interface';
import { User } from '../../User/user.interface';

export function UserStoryConverter(user: User, viewed: boolean) {
  const data = {
    id: user.id,
    fullname: user.fullname,
    profile_picture: user.profile_picture,
    viewed: viewed,
  };
  return data;
}
