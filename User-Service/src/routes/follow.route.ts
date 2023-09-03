import { FollowingController } from "../controller/follow.controller";
import { checkUserType } from "../middleware/currentUser";
import express from "express"


const router = express.Router();

const followingController = new FollowingController();

router.post('/', followingController.follow.bind(followingController));
router.get('/followers', followingController.getMyFollowers.bind(followingController));
router.get('/followings', followingController.getMyFollowings.bind(followingController));
router.delete('/', followingController.unfollow.bind(followingController));
//router.get('/followers', followingController.getFollowerId.bind(followingController));

export default router;