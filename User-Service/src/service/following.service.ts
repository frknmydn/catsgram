import { stringify } from "querystring";
import { AppDataSource } from "../data-source";
import { users } from "../entity/User.entity"; // Değiştirilen kısmı düzeltilen entity sınıfının adıyla değiştirin
import { EntityManager, Repository } from "typeorm";
import { followers } from "../entity/Followings.entity";

export class FollowingService {
  async follow(followerData: Partial<followers>) {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();

    const followerUserID = followerData.follower_user_id;
    const followingUserID = followerData.following_user_id;

    console.log("followerUserID: " + followerUserID);
    console.log("followedUserID: " + followingUserID);
    await queryRunner.startTransaction();
    try {
      //check if user already followed

      const areTheyFollowingEachOther = await queryRunner.manager.createQueryBuilder().select("followers")
      .from(followers,"followers").where("followers.follower_user_id = :followerUserID AND followers.following_user_id = :followingUserID",{followerUserID,followingUserID}).
      getOne();


      console.log(
        "areTheyFollowingEachOther: " + String(areTheyFollowingEachOther)
      );
      //control that if areTheyFollowingEachOther's user_id and followings_user_id are equal to followerUserID and followedUserID
      if (areTheyFollowingEachOther && areTheyFollowingEachOther.isApproved) {
        //dont throw error, send message to client
        return { success: false, message: "User already followed" };
      }

      if(areTheyFollowingEachOther && !areTheyFollowingEachOther.isApproved){
        //dont throw error, send message to client
        return { success: false, message: "User already followed but not approved" };
      }

      

      //increment value of following_count in users table
      await queryRunner.manager.increment(
        users,
        { user_id: followerUserID },
        "following_count",
        1
      );

      await queryRunner.manager.increment(
        users,
        { user_id: followerUserID },
        "follower_count",
        1
      );

      //add date to followdata
      followerData.follow_date = new Date();

      await queryRunner.manager.save(followers,followerData);

      followerData.follow_date = new Date();

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
/*
  async unfollow(
    followData: Partial<followings>,
    followerData: Partial<followers>
  ) {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();

    const followerUserID = followData.user_id;
    const followedUserID = followerData.user_id;

    console.log("followerUserID: " + followerUserID);
    console.log("followedUserID: " + followedUserID);
    await queryRunner.startTransaction();
    try {
      //check if user already followed

      const areTheyFollowingEachOther = await queryRunner.manager.findOne(
        followings,
        {
          where: {
            user_id: followerUserID,
          },
        }
      );

      if (areTheyFollowingEachOther) {
        //dont throw error, send message to client
        await queryRunner.manager.decrement(
          users,
          { user_id: followerUserID },
          "following_count",
          1
        );

        await queryRunner.manager.decrement(
          users,
          { user_id: followedUserID },
          "follower_count",
          1
        );

        await queryRunner.manager.delete(followings, followData);
        await queryRunner.manager.delete(followers, followerData);
        await queryRunner.commitTransaction();
        return { success: true, message: "User unfollowed" };
      } else {
        return { success: false, message: "User already unfollowed" };
      }

      //increment value of following_count in users table
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getFollowerIds(followdata: Partial<followers>) {
    const followersRepo = AppDataSource.manager.getRepository(followers);
    const followerIds = await followersRepo.find({
      select: ["followers_user_id"],
      where: {
        user_id: followdata.user_id,
      },
    });
    return followerIds;
  }
  */
}
