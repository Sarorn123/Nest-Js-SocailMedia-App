"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoryConverter = exports.UserStoryConverter = void 0;
function UserStoryConverter(user, viewed) {
    const data = {
        id: user.id,
        fullname: user.fullname,
        profile_picture: user.profile_picture,
        viewed: viewed,
    };
    return data;
}
exports.UserStoryConverter = UserStoryConverter;
function StoryConverter(story) {
    const data = {
        id: story.id,
        userId: story.userId,
        image_url: story.image_url,
        likes: story.likes.length,
        viewers: story.viewers.length,
        created_at: timeDifference(Date.now(), story.created_at),
    };
    return data;
    function timeDifference(current, previous) {
        const msPerMinute = 60 * 1000;
        const msPerHour = msPerMinute * 60;
        const msPerDay = msPerHour * 24;
        const msPerMonth = msPerDay * 30;
        const msPerYear = msPerDay * 365;
        const elapsed = current - previous;
        if (elapsed < msPerMinute) {
            return Math.round(elapsed / 1000) + ' seconds ago';
        }
        else if (elapsed < msPerHour) {
            return Math.round(elapsed / msPerMinute) + ' minutes ago';
        }
        else if (elapsed < msPerDay) {
            return Math.round(elapsed / msPerHour) + ' hours ago';
        }
        else if (elapsed < msPerMonth) {
            return 'approximately ' + Math.round(elapsed / msPerDay) + ' days ago';
        }
        else if (elapsed < msPerYear) {
            return ('approximately ' + Math.round(elapsed / msPerMonth) + ' months ago');
        }
        else {
            return 'approximately ' + Math.round(elapsed / msPerYear) + ' years ago';
        }
    }
}
exports.StoryConverter = StoryConverter;
//# sourceMappingURL=story.convert.js.map