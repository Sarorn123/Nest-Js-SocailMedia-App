export function postConverter(post, comments?: any) {
  return {
    id: post.id,
    caption: post.caption,
    image_or_video: post.image_or_video,
    post_status: post.post_status,
    tages: post.tages,
    likes: post.likes?.length,
    user: {
      id: post.userId?._id,
      fullname: post.userId?.fullname,
      gender: post.userId?.gender,
      email_or_phone: post.userId?.email_or_phone,
      profile_picture: post.userId.profile_picture,
    },
    created_at: post.created_at,
    updated_at: post.updated_at,
    comments: comments,
  };
}
