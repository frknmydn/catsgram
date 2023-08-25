import express from 'express'
import UserController from '../controller/user.controller';

const router = express.Router();

router.post(
    "/createuser",
    UserController.createUser);

export default router;