import { UserService } from '../user.service';
import { User } from '../user.interface';
export declare class FollowService extends UserService {
    actionFollowing(follower_id: string, following_id: string): Promise<any>;
    getAllUserFollowing(id: string, user: User): Promise<object[]>;
    getAllUserFollower(id: string, user: User): Promise<object[]>;
}
