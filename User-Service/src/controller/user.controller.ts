import { NextFunction, Request, Response } from 'express';
import { UserService } from '../service/user.service';

 class UserController{
     static async createUser(req:Request, res:Response, next:NextFunction){
        try{
            const{username,full_name, birthdate, profile_picture_url,
                 report_count, follower_count, following_count, isBanned} = req.body;
            
            const createUser = await UserService.createUser(username, full_name, birthdate,
                profile_picture_url,report_count,follower_count,following_count, isBanned);
                res.sendStatus(201);
                
        }
        catch(error){
            throw(error);
        }
    }

    static async getAllUsers(req:Request, res:Response, next:NextFunction){
        const users = await UserService.getAllUsers();
        res.send(users)
    }

    static async getUserByid(req: Request, res: Response){
        const user = await UserService.getUserById(req.body.user_id);
        res.send(user);
    }
    static async getUserByUsername(req:Request,res:Response){
        const user = await UserService.getUserByUsername(req.body.username);
        res.send(user);
    }
    static async getReportedUsers(req:Request, res:Response){
        const users = await UserService.getUsersWithReportCount();
        res.send(users);

    }

    static async isUserBanned(req:Request, res:Response){
        const userId = parseInt(req.params.user_id, 10);
        if (isNaN(userId)) {
            // Eğer dönüştürme işlemi başarısızsa hata işle
            res.status(400).send("Geçersiz kullanıcı ID'si");
            return;
          }

          const user = await UserService.isUserBanned(userId);
            res.send(user);
    }
}

export default UserController;