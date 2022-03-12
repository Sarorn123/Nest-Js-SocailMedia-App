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

export function StoryConverter(story: Story) {
  const data = {
    id: story.id,
    userId: story.userId,
    image_url: story.image_url,
    likes: story.likes.length,
    viewers: story.viewers.length,
    created_at: timeDifference(Date.now(), story.created_at),
  };
  return data;

  function timeDifference(current: number, previous: any) {
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + ' seconds ago';
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + ' minutes ago';
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + ' hours ago';
    } else if (elapsed < msPerMonth) {
      return 'approximately ' + Math.round(elapsed / msPerDay) + ' days ago';
    } else if (elapsed < msPerYear) {
      return (
        'approximately ' + Math.round(elapsed / msPerMonth) + ' months ago'
      );
    } else {
      return 'approximately ' + Math.round(elapsed / msPerYear) + ' years ago';
    }
  }
}
