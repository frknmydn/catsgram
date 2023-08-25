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
}

