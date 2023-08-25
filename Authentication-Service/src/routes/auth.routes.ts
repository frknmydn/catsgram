import express from 'express'
import validateResource from "../middlewares/validateResource";
import AuthController from "../controller/auth.controller"

const router = express.Router();

router.post(
    "/register",
    AuthController.register
);

router.post(
    '/login', 
    AuthController.login
    );
router.post(
    '/changepass', 
    AuthController.changePasswordByUser
    );
    router.delete(
        '/deleteuser/:username', 
        AuthController.deleteUser
        );


export default router;
