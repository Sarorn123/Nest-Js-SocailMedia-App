import { Comment } from '../comment.interface';
export declare function CommentConverter(comment: Comment, replys?: any): {
    id: string;
    body: string;
    likes: number;
    created_at: Date;
    updated_at: Date;
    user: {
        id: string;
        fullname: string;
        gender: number;
        profile_picture: string;
    };
    replys: any;
};
