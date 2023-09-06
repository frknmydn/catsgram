import { FollowingController } from "../controller/follow.controller";
import { checkUserType } from "../middleware/currentUser";
import express from "express"


const router = express.Router();

const followingController = new FollowingController();

router.post('/', followingController.follow.bind(followingController));
router.get('/followers', followingController.getMyFollowers.bind(followingController));
router.get('/followings', followingController.getMyFollowings.bind(followingController));
router.delete('/', followingController.unfollow.bind(followingController));
router.get('/followers/:id', followingController.getFollowerId.bind(followingController));
router.get('/followings/:id', followingController.getFollowingId.bind(followingController));
router.get('/followerprofiles/:id', followingController.getMyFollowerProfilesWithPage.bind(followingController));
router.get('/followingprofiles/:id', followingController.getMyFollowingProfilesWithPage.bind(followingController));

export default router;