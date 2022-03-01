"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postConverter = void 0;
function postConverter(post, comments) {
    var _a, _b, _c, _d, _e;
    return {
        id: post.id,
        caption: post.caption,
        image_or_video: post.image_or_video,
        post_status: post.post_status,
        tages: post.tages,
        likes: (_a = post.likes) === null || _a === void 0 ? void 0 : _a.length,
        user: {
            id: (_b = post.userId) === null || _b === void 0 ? void 0 : _b._id,
            fullname: (_c = post.userId) === null || _c === void 0 ? void 0 : _c.fullname,
            gender: (_d = post.userId) === null || _d === void 0 ? void 0 : _d.gender,
            email_or_phone: (_e = post.userId) === null || _e === void 0 ? void 0 : _e.email_or_phone,
            profile_picture: post.userId.profile_picture,
        },
        created_at: post.created_at,
        updated_at: post.updated_at,
        comments: comments,
    };
}
exports.postConverter = postConverter;
//# sourceMappingURL=post.convert.js.map