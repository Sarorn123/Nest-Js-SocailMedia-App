export declare class AddCommentDto {
    postId: string;
    userId: string;
    body: string;
    is_reply_to: boolean;
    parentId: string;
}
export declare class EditCommentDto {
    postId: string;
    userId: string;
    body: string;
    is_reply_to: boolean;
    parentId: string;
}
