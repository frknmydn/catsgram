import { AppDataSource } from "../data-source";
import { followers } from "../entity/FollowerUser.entity";
import { followings } from "../entity/FollowingUser.entity";
import { users } from "../entity/User.entity";

export class FollowingService {
  

  async follow(followerID: number, followingID: number,followData: Partial<followings>): Promise<{ follow: followings; getFollowed: followers }> {
    const follow = await AppDataSource.manager.save(followings, followData);
    const getFollowed = await AppDataSource.manager.save(followers, followData);
    const increaseFollowingCountUserRepository = AppDataSource.manager.getRepository(users);
    await increaseFollowingCountUserRepository.increment({ user_id: followerID }, 'followingCount', 1);

    const increaseFollowerCountUserRepository = AppDataSource.manager.getRepository(users);
    await increaseFollowerCountUserRepository.increment({ user_id: followingID }, 'followerCount', 1);

    return {follow, getFollowed}

    //todo: check this process again, search for optimization
  }

  
  
  
  
}