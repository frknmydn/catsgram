import { AppDataSource } from "../data-source";
import { followers } from "../entity/FollowerUser.entity"; // Değiştirilen kısmı düzeltilen entity sınıfının adıyla değiştirin
import { followings } from "../entity/FollowingUser.entity"; // Değiştirilen kısmı düzeltilen entity sınıfının adıyla değiştirin
import { users } from "../entity/User.entity"; // Değiştirilen kısmı düzeltilen entity sınıfının adıyla değiştirin
import { EntityManager, Repository } from "typeorm";

export class FollowingService {


  async followDeneme(followData: Partial<followings>, followerData: Partial<followers>) {

      const queryRunner = AppDataSource.createQueryRunner();
      await queryRunner.connect();

      const followerUserID = followData.user_id;
      const followedUserID = followerData.user_id;
      
      console.log("followerUserID: " + followerUserID)
      await queryRunner.startTransaction();
      try{
        //increment value of following_count in users table
        await queryRunner.manager.increment(users, {user_id: followerUserID}, "following_count", 1);
        await queryRunner.manager.increment(users, {user_id: followedUserID}, "follower_count", 1);

        //TODO: insert into followings table and followers table and check if user is already followed

        await queryRunner.commitTransaction();
      }
      catch(error){
        await queryRunner.rollbackTransaction();
        throw error;
      }
      finally{
        await queryRunner.release();
      }
    
    
    

      
}
  
  async follow(followData: Partial<followings>, followerData: Partial<followers>) {
    const connection = AppDataSource.manager.connection;

    // Başlatmak için bir transaction oluşturun
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const entityManager: EntityManager = queryRunner.manager;

    try {
      // 1. İlk işlem: following tablosuna kayıt ekle
      const follow = entityManager.create(followings, followData);
      await entityManager.save(followings, follow);
      
      // 2. İkinci işlem: follower tablosuna kayıt ekle
      const follower = entityManager.create(followers, followerData);
      await entityManager.save(followers, follower);

      // 3. Üçüncü işlem: followingCount'u artır
      const existingFollowerID = followData.user_id;
      await entityManager.increment(users, { user_id: existingFollowerID }, 'following_count', 1);

      // 4. Dördüncü işlem: followerCount'u artır
      const existingFollowingID = followerData.user_id;
      await entityManager.increment(users, { user_id: existingFollowingID }, 'follower_count', 1);

      // Tüm işlemler başarılıysa, transaction'ı commit et
      await queryRunner.commitTransaction();

      return { follow, follower };
    } catch (error) {
      // Hata durumunda transaction'ı geri al
      await queryRunner.rollbackTransaction();
      throw error; // Hata yeniden fırlatılabilir veya uygun şekilde işlenebilir.
    } finally {
      // QueryRunner'ı kapatın
      await queryRunner.release();
    }
  }
}
