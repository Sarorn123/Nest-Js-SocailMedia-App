import { User } from '../user.interface';
export function userConverter(user: User, followed?: boolean) {
  return {
    id: user.id,
    fullname: user.fullname,
    email_or_phone: user.email_or_phone,
    followers: user.followers.length,
    followings: user.followings.length,
    profile_picture: user.profile_picture,
    created_at: user.created_at,
    updated_at: user.updated_at,

    followed: followed ? true : false,
  };
}
