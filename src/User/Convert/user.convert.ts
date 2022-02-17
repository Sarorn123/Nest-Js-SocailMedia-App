import { User } from '../user.interface';
export function userConverter(user: User) {
  return {
    id: user.id,
    fullname: user.fullname,
    email_or_phone: user.email_or_phone,
    followers: user.followers,
    followings: user.followings,
    profile_picture: user.profile_picture,
    cover_picture: user.cover_picture,
    photos_or_videos: user.photos_or_videos,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };
}
