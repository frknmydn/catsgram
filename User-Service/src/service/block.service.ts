import { blocked_users } from "../entity/BlockedUser.entity";
import { users } from "../entity/User.entity";
import { AppDataSource } from "../data-source";
import { followers } from "../entity/Followings.entity";
import { FollowingService } from "./following.service";

export class blockService {
  async block(blockData: Partial<blocked_users>) {
    try {
      const queryRunner = AppDataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
      const blockedUserID = blockData.blockedUser;
      const blockingUserID = blockData.user;

      const blockedDataToUnfollow = new followers();
      blockedDataToUnfollow.following_user_id = blockedUserID;
      blockedDataToUnfollow.follower_user_id = blockingUserID;
      const blockedDataToUnfollowReverse = new followers();
      blockedDataToUnfollowReverse.following_user_id = blockingUserID;
      blockedDataToUnfollowReverse.follower_user_id = blockedUserID;

      const followingService = new FollowingService();

      await followingService.unfollow(blockedDataToUnfollow);
      await followingService.unfollow(blockedDataToUnfollowReverse);

      await queryRunner.manager.save(blocked_users, blockData);

      await queryRunner.commitTransaction();
      return blockData;
    } catch (error) {
      throw error;
    }
  }

  async unblock(blockData: Partial<blocked_users>) {
    try {
      const queryRunner = AppDataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
      const blockedUserID = blockData.blockedUser;
      const blockingUserID = blockData.user;

      const isBlocked = await queryRunner.manager.
        createQueryBuilder()
        .select("blocked_users")
        .from(blocked_users, "blocked_users")
        .where(
          "blocked_users.user = :blockingUserID AND blocked_users.blockedUser = :blockedUserID",
          { blockingUserID, blockedUserID }
        )
        .getOne();

        console.log(isBlocked);
      if (isBlocked) {
        const blockedDataToFollow = new followers();
      blockedDataToFollow.following_user_id = blockedUserID;
      blockedDataToFollow.follower_user_id = blockingUserID;
      const blockedDataToFollowReverse = new followers();
      blockedDataToFollowReverse.following_user_id = blockingUserID;
      blockedDataToFollowReverse.follower_user_id = blockedUserID;

      await queryRunner.manager.delete(blocked_users, blockData);

      await queryRunner.commitTransaction();
      return blockData;
      }
      else{
        throw new Error("Kullanıcı engellenmemiş.");
      }

      
    } catch (error) {
      throw error;
    }
  }
}
