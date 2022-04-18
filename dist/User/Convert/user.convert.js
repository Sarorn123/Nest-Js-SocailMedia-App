"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userConverter = void 0;
function userConverter(user, followed) {
    return {
        id: user.id,
        fullname: user.fullname,
        email_or_phone: user.email_or_phone,
        followers: user.followers.length,
        followings: user.followings.length,
        profile_picture: user.profile_picture,
        created_at: user.created_at,
        updated_at: user.updated_at,
        followed: followed,
    };
}
exports.userConverter = userConverter;
//# sourceMappingURL=user.convert.js.map