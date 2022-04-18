/// <reference types="multer" />
import { UserService } from '../User/user.service';
import { StoryService } from '../Story/story.service';
import { User } from '../User/user.interface';
export declare const FILEPATH: {
    PROFILE_PICTURE: string;
    STORY_PICTURE: string;
};
export declare function storage(filePath: string): {
    storage: import("multer").StorageEngine;
};
export default class FileController {
    private readonly userService;
    private readonly storyService;
    constructor(userService: UserService, storyService: StoryService);
    uploadSinglePicture(file: Express.Multer.File, id: string, req: any): Promise<object | {
        message: string;
        status: boolean;
        error: any;
    }>;
    getProfilePicture(res: any, filename: string): Promise<import("rxjs").Observable<any>>;
    deleteFile(filename: any): Promise<any>;
    addStoryImage(file: Express.Multer.File, req: any, user: User): Promise<import("../Story/story.interface").Story | {
        message: any;
        status: boolean;
        error: any;
    }>;
    getStoryImage(res: any, filename: string): Promise<import("rxjs").Observable<any>>;
    deleteStoryFile(id: string, user: User): Promise<any>;
}
