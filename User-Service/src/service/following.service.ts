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

      const areTheyFollowingEachOther = await queryRunner.manager
        .createQueryBuilder()
        .select("followers")
        .from(followers, "followers")
        .where(
          "followers.follower_user_id = :followerUserID AND followers.following_user_id = :followingUserID",
          { followerUserID, followingUserID }
        )
        .getOne();

      console.log(
        "areTheyFollowingEachOther: " + String(areTheyFollowingEachOther)
      );
      //control that if areTheyFollowingEachOther's user_id and followings_user_id are equal to followerUserID and followedUserID
      if (areTheyFollowingEachOther && areTheyFollowingEachOther.isApproved) {
        //dont throw error, send message to client
        return { success: false, message: "User already followed" };
      }

      if (areTheyFollowingEachOther && !areTheyFollowingEachOther.isApproved) {
        //dont throw error, send message to client
        return {
          success: false,
          message: "User already followed but not approved",
        };
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

      await queryRunner.manager.save(followers, followerData);

      followerData.follow_date = new Date();

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async unfollow(followerData: Partial<followers>) {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    const followerUserID = followerData.follower_user_id;
    const followingUserID = followerData.following_user_id;

    try {
      await queryRunner.startTransaction();
      const areTheyFollowingEachOther = await queryRunner.manager
        .createQueryBuilder()
        .select("followers")
        .from(followers, "followers")
        .where(
          "followers.follower_user_id = :followerUserID AND followers.following_user_id = :followingUserID",
          { followerUserID, followingUserID }
        )
        .getOne();

      if (areTheyFollowingEachOther) {
        await queryRunner.manager.decrement(
          users,
          { user_id: followerUserID },
          "following_count",
          1
        );

        await queryRunner.manager.decrement(
          users,
          { user_id: followingUserID },
          "follower_count",
          1
        );

        await queryRunner.manager.delete(followers, followerData);
        await queryRunner.commitTransaction();
        return { success: true, message: "User unfollowed" };
      } else {
        return { success: false, message: "User already unfollowed" };
      }
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
  async getFollowerIds(userID: number) {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      const followerIDs = await queryRunner.manager
        .createQueryBuilder()
        .select("followers")
        .from(followers, "followers")
        .where("followers.following_user_id = :userID", { userID })
        .getRawMany();

      console.log(followerIDs);

      const ids = followerIDs.map(
        (followerID) => followerID.followers_followerUserIdUserId
      );

      return ids;
    } catch (error) {
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getFollowingIds(userID: number) {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      const followingIDs = await queryRunner.manager
        .createQueryBuilder()
        .select("followers")
        .from(followers, "followers")
        .where("followers.follower_user_id = :userID", { userID })
        .getRawMany();

      console.log(followingIDs);

      const ids = followingIDs.map(
        (followingID) => followingID.followers_followingUserIdUserId
      );

      return ids;
    } catch (error) {
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getMyFollowerProfilesWithPage(userID: number, page: number) {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
  
    try {
      const pageSize = 10; // Sayfa başına kaç kullanıcı 
      const offset = (page - 1) * pageSize; // Sayfa numarasına göre hesaplam
  
      const ids = await this.getFollowerIds(userID);
  
      const profiles = await queryRunner.manager
        .createQueryBuilder()
        .select("users")
        .from("users", "users")
        .where("users.user_id IN (:...ids)", { ids })
        .skip(offset) // Kaydırma ekleyin
        .take(pageSize) // Sayfa boyutunu belirtin
        .getMany();
  
      return profiles;
    } catch (error) {
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getMyFollowingProfilesWithPage(userID: number, page: number) {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
  
    try {
      const pageSize = 10; // Sayfa başına kaç kullanıcı 
      const offset = (page - 1) * pageSize; // Sayfa numarasına göre hesaplam
  
      const ids = await this.getFollowingIds(userID);
  
      const profiles = await queryRunner.manager
        .createQueryBuilder()
        .select("users")
        .from("users", "users")
        .where("users.user_id IN (:...ids)", { ids })
        .skip(offset) // Kaydırma ekleyin
        .take(pageSize) // Sayfa boyutunu belirtin
        .getMany();
  
      return profiles;
    } catch (error) {
      throw error;
    } finally {
      await queryRunner.release();
    }
  }


}
