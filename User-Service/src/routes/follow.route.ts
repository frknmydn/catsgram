import { FollowingController } from "../controller/follow.controller";
import { checkUserType } from "../middleware/currentUser";
import express from "express"


const router = express.Router();

const followingController = new FollowingController();

router.post('/', followingController.follow.bind(followingController));

router.post('/deneme', followingController.followDeneme.bind(followingController));

export default router;