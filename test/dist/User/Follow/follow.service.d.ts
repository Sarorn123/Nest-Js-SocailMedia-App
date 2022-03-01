import { UserService } from '../user.service';
export declare class FollowService extends UserService {
    actionFollowing(follower_id: string, following_id: string): Promise<any>;
}
