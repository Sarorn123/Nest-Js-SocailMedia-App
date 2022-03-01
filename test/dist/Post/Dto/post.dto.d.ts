export declare class AddPostDto {
    userId: string;
    caption: string;
    tages: [string];
    post_status: string;
    image_or_video: [string];
}
export declare class EditPostDto {
    caption: string;
    tages: [string];
    post_status: string;
    image_or_video: [string];
}
export declare class DeletePostDto {
    userId: string;
    postId: string;
}
