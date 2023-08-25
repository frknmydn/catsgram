import { NextFunction, Request, Response } from 'express';
import { UserService } from '../service/user.service';

 class UserController{
     static async createUser(req:Request, res:Response, next:NextFunction){
        try{
            const{username,full_name, birthdate, profile_picture_url,
                 report_count, follower_count, following_count} = req.body;
            
            const createUser = await UserService.createUser(username, full_name, birthdate,
                profile_picture_url,report_count,follower_count,following_count);
                res.sendStatus(201);
                
        }
        catch(error){
            throw(error);
        }
    }
}

export default UserController;