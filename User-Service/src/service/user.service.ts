import { MoreThan } from 'typeorm';
import {AppDataSource} from '../data-source'
import { user } from '../entity/User.entity'

export class UserService {

    static async createUser (username:string,full_name:string, birthdate:Date, profile_picture_url:string, 
        report_count:number, follower_count:number, following_count:number): Promise<user> {
            const userToAdd = new user();
            userToAdd.username= username;
            userToAdd.full_name = full_name;
            userToAdd.birthdate = birthdate;
            userToAdd.profile_picture_url = profile_picture_url;
            userToAdd.report_count = report_count;
            userToAdd.follower_count = follower_count;
            userToAdd.following_count = following_count;

            try{
                await AppDataSource.manager.save(userToAdd);
                return userToAdd;
            }
            catch(error){
                throw error
            }
        }


    static async getAllUsers(): Promise<user[]>{
        
            try {
                const users = await AppDataSource.manager.find(user); // Tüm kullanıcıları veritabanından alın
                return users;
            } catch (error) {
                throw error;
            }
        
    }

    static async getUserById(userId: number) {
        try {
            // Veritabanında belirli bir kullanıcıyı ID'ye göre al
            const userRepository = AppDataSource.manager.getRepository(user);
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
            const userRepository = AppDataSource.manager.getRepository(user);
            const foundUser = await userRepository.findOneBy({
                username:username
            })
            return foundUser
        }
        catch(error){
            throw error;
        }
    }

    static async getUsersWithReportCount(): Promise<user[]> {
        try {
          const userRepository = AppDataSource.manager.getRepository(user);
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
}

