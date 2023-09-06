import { BlockController } from "../controller/block.controller";
import { checkUserType } from "../middleware/currentUser";
import express from "express"

const router = express.Router();

const blockController = new BlockController();

router.post('/', blockController.block.bind(blockController));
router.delete('/unblock', blockController.unblock.bind(blockController));

export default router;