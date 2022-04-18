import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { Story } from './story.interface';
import { User } from '../User/user.interface';
import { UserService } from '../User/user.service';
export declare class StoryService {
    protected storyModel: Model<Story>;
    private userService;
    constructor(storyModel: Model<Story>, userService: UserService);
    getAllStory(user: User): Promise<object[]>;
    getStory(id: string, user: User): Promise<any[]>;
    addStory(user: User, image_url: string, image_name: string): Promise<Story>;
    actionViewStory(id: string, user: User): Promise<any>;
    deleteStory(id: string, user: User): Promise<any>;
    actionLikeStory(id: string, user: User): Promise<any>;
    getAllStoryViewer(id: string, user: User): Promise<any[]>;
    getStoryById(id: string): Promise<mongoose.Document<unknown, any, Story> & Story & {
        _id: mongoose.Types.ObjectId;
    }>;
}
