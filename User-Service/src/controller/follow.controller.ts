import {Request, Response} from "express";
import { FollowingService } from "../service/following.service";
import { followers } from "../entity/Followings.entity"



export class FollowingController {
    public followingService: FollowingService;

    constructor() {
        this.followingService = new FollowingService();
    }


    async follow(req: Request, res: Response) {
        try {
            const followerData: Partial<followers> = req.body.followerData;
            
            
            const followed = await this.followingService.follow(followerData);
            
            res.status(201).json(followed);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Takip edilemedi.' });
        }
    }

    async getMyFollowers(req: Request, res: Response) {
        try {
            const followerIDs: Partial<number> = req.body.follower_user_id;
            console.log(followerIDs);
            const followerID = await this.followingService.getFollowerIds(followerIDs);
            res.send(followerID);
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Takip edilemedi.' });
        }
    }

    async getMyFollowings(req: Request, res: Response) {
        try {
            const followingIDs: Partial<number> = req.body.following_user_id;
            console.log(followingIDs);
            const followingID = await this.followingService.getFollowingIds(followingIDs);
            res.send(followingID);
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Takip edilemedi.' });
        }
    }

    async unfollow(req: Request, res: Response) {
        try {
            const followerData: Partial<followers> = req.body.followerData;
            
            
            const followed = await this.followingService.unfollow(followerData);
            
            res.status(201).json(followed);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Takip edilemedi.' });
        }
    }

    async getFollowerId(req: Request, res: Response) {
        try {
            const userIDofProfile = req.body.followerData.user_id;

            const followerID = await this.followingService.getFollowerIds(userIDofProfile);
            res.send(followerID);
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Takip edilemedi.' });
        }
    }

    async getFollowingId(req: Request, res: Response) {
        try {
            const userIDofProfile = req.body.followerData.user_id;

            const followingID = await this.followingService.getFollowingIds(userIDofProfile);
            res.send(followingID);
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Takip edilemedi.' });
        }
    }

    async getMyFollowerProfilesWithPage(req: Request, res: Response) {
        try {
            const userIDofProfile = req.body.user_id;
            console.log(userIDofProfile);
            const page = req.body.page;

            const followerProfiles = await this.followingService.getMyFollowerProfilesWithPage(userIDofProfile, page);
            res.send(followerProfiles);
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Takip edilemedi.' });
        }
    }

    async getMyFollowingProfilesWithPage(req: Request, res: Response) {
        try {
            const userIDofProfile = req.body.user_id;
            console.log(userIDofProfile);
            const page = req.body.page;

            const followingProfiles = await this.followingService.getMyFollowingProfilesWithPage(userIDofProfile, page);
            res.send(followingProfiles);
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Takip edilemedi.' });
        }
    }
    /*

    async unfollow(req: Request, res: Response) {
        try {
            const followerData: Partial<followings> = req.body.followerData;
            const followedData: Partial<followers> = req.body.followedData;
            
            
            const followed = await this.followingService.unfollow(followerData, followedData);
            
            res.status(201).json(followed);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Takip edilemedi.' });
        }
    }

    async getFollowerId(req: Request, res: Response) {
        try {
            const followerData: Partial<followers> = req.body.followerData;

            const followerID = await this.followingService.getFollowerIds(followerData);
            res.send(followerID);
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Takip edilemedi.' });
        }
    }
    */
}