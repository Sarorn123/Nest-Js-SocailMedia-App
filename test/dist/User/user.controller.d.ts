import { FollowService } from './Follow/follow.service';
import { ActionFollowDto } from './Follow/Dto/follow.dto';
export default class UserController {
    private readonly followService;
    constructor(followService: FollowService);
    actionFollowing(followDto: ActionFollowDto): Promise<any>;
}
