import { Comment } from '../comment.interface';

export function CommentConverter(comment: Comment, replys?: any) {
  const data = {
    id: comment.id,
    body: comment.body,
    likes: comment.likes.length,
    created_at: comment.created_at,
    updated_at: comment.updated_at,
    user: {
      id: comment.userId.id,
      fullname: comment.userId.fullname,
      gender: comment.userId.gender,
      profile_picture: comment.userId.profile_picture,
    },
    replys: replys,
  };
  return data;
}
