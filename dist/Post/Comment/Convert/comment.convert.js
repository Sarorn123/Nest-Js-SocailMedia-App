"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentConverter = void 0;
function CommentConverter(comment, replys) {
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
exports.CommentConverter = CommentConverter;
//# sourceMappingURL=comment.convert.js.map