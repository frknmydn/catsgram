import { MigrationInterface, QueryRunner } from "typeorm"

export class ChangeFollowerscolumnids1693486320966 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // followers tablosundaki sütun isimlerini ayrı ayrı değiştirme sorgusu
        //await queryRunner.query(`ALTER TABLE "followers" RENAME COLUMN "follower_id" TO "id"`);
        await queryRunner.query(`ALTER TABLE "followers" RENAME COLUMN "user" TO "user_id"`);
        await queryRunner.query(`ALTER TABLE "followers" RENAME COLUMN "followerUser" TO "follower_user_id"`);
        //await queryRunner.query(`ALTER TABLE "followers" RENAME COLUMN "followerUser" TO "follower_user_id"`);
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        // Geri alma sorgusu (Opsiyonel)
        // Eğer geri alma işlemi yapmak isterseniz, bu metodu düzenleyebilirsiniz.
        //await queryRunner.query(`ALTER TABLE "followers" RENAME COLUMN "id" TO "follower_id"`);
        await queryRunner.query(`ALTER TABLE "followers" RENAME COLUMN "user_id" TO "user"`);
        await queryRunner.query(`ALTER TABLE "followers" RENAME COLUMN "follower_user_id" TO "followerUser"`);
        //await queryRunner.query(`ALTER TABLE "followers" RENAME COLUMN "follower_user_id" TO "followerUser"`);
      }

}
