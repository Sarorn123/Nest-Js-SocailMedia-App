import { User } from '../User/user.interface';
import { StoryService } from './story.service';
export default class StoryController {
    private readonly storyService;
    constructor(storyService: StoryService);
    getAllStory(user: User): Promise<any>;
    getStory(user: User, id: string): Promise<any>;
    actionViewStory(user: User, id: string): Promise<any>;
    actionLikeStory(user: User, id: string): Promise<any>;
    getAllStoryViewer(user: User, id: string): Promise<any>;
}
