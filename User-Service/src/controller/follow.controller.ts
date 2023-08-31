import {Request, Response} from "express";
import { FollowingService } from "../service/following.service";
import { followers } from "../entity/FollowerUser.entity";
import { followings } from "../entity/FollowingUser.entity";



export class FollowingController {
    public followingService: FollowingService;

    constructor() {
        this.followingService = new FollowingService();
    }

    async follow(req: Request, res: Response) {
        try {
            const followData: Partial<followings> = req.body;
            const followerData: Partial<followers> = req.body;
            const followed = await this.followingService.follow(followData, followerData);
            
            res.status(201).json(followed);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Takip edilemedi.' });
        }
    }

    async followDeneme(req: Request, res: Response) {
        try {
            const followerData: Partial<followings> = req.body.followerData;
            const followedData: Partial<followers> = req.body.followedData;
            
            
            const followed = await this.followingService.followDeneme(followerData, followedData);
            
            res.status(201).json(followed);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Takip edilemedi.' });
        }
    }
}