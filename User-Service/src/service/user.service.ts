import { MoreThan } from 'typeorm';
import {AppDataSource} from '../data-source'
import { users } from '../entity/User.entity'

export class UserService {

    static async createUser (username:string,full_name:string, birthdate:Date, profile_picture_url:string, 
        report_count:number, follower_count:number, following_count:number, isBanned: boolean): Promise<users> {
            const userToAdd = new users();
            userToAdd.username= username;
            userToAdd.full_name = full_name;
            userToAdd.birthdate = birthdate;
            userToAdd.profile_picture_url = profile_picture_url;
            userToAdd.report_count = report_count;
            userToAdd.follower_count = follower_count;
            userToAdd.following_count = following_count;
            userToAdd.isBanned = isBanned;

            try{
                await AppDataSource.manager.save(userToAdd);
                return userToAdd;
            }
            catch(error){
                throw error
            }
        }


    static async getAllUsers(): Promise<users[]>{
        
            try {
                const userses = await AppDataSource.manager.find(users); // Tüm kullanıcıları veritabanından alın
                return userses;
            } catch (error) {
                throw error;
            }
        
    }

    static async getUserById(userId: number) {
        try {
            // Veritabanında belirli bir kullanıcıyı ID'ye göre al
            const userRepository = AppDataSource.manager.getRepository(users);
            const foundUser = await userRepository.findOneBy({
                user_id:userId
            })             

            return foundUser;
        } catch (error) {
            throw error;
        }
    }

    static async getUserByUsername(username: string){
        try{
            const userRepository = AppDataSource.manager.getRepository(users);
            const foundUser = await userRepository.findOneBy({
                username:username
            })
            return foundUser
        }
        catch(error){
            throw error;
        }
    }

    static async getUsersWithReportCount(): Promise<users[]> {
        try {
          const userRepository = AppDataSource.manager.getRepository(users);
          const foundUsers = await userRepository.find({
            where: {
              report_count: MoreThan(0)
            }
          });
          return foundUsers;
        } catch (error) {
          throw error;
        }
      }

    static async isUserBanned(userId: number): Promise<boolean> {
        try {
          const userRepository = AppDataSource.manager.getRepository(users);
          const foundUser = await userRepository.findOneBy({
            user_id: userId
          });
          return foundUser.isBanned;
        } catch (error) {
          throw error;
        }
      }
}

