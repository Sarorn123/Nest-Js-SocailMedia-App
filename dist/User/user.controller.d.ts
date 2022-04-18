import { FollowService } from './Follow/follow.service';
import { ActionFollowDto } from './Follow/Dto/follow.dto';
import { User } from './user.interface';
export default class UserController {
    private readonly followService;
    constructor(followService: FollowService);
    actionFollowing(followDto: ActionFollowDto): Promise<any>;
    getAllUserFollowing(id: string, user: User): Promise<object[]>;
    getAllUserFollower(id: string, user: User): Promise<object[]>;
}
