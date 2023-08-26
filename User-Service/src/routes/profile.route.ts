import express from 'express'
import UserController from '../controller/user.controller';
import { checkUserType } from '../middleware/currentUser';
const router = express.Router();

router.post(
    "/createuser",
    UserController.createUser);

router.get(
    "/getallusers",checkUserType,
    UserController.getAllUsers
)

export default router;