export interface User {
  id?: string;
  fullname: string;
  email_or_phone: string;
  password: string;
  profile_picture: string;
  cover_picture: string;
  photos_or_videos: String[];
  followers: String[];
  followings: String[];
  role: string;
  created_at: Date;
  updated_at: Date;
}
