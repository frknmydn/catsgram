import { Request, Response } from "express";
import { blockService } from "../service/block.service";
import { blocked_users } from "../entity/BlockedUser.entity";

export class BlockController {
  public blockService: blockService;

  constructor() {
    this.blockService = new blockService();
  }

  async block(req: Request, res: Response) {
    try {
      const blockData: Partial<blocked_users> = req.body.blockData;
      const blocked = await this.blockService.block(blockData);

      res.status(201).json(blocked);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Engellenemedi." });
    }
  }

  async unblock(req: Request, res: Response) {
    try {
      const blockData: Partial<blocked_users> = req.body.blockData;
      const blocked = await this.blockService.unblock(blockData);

      res.status(201).json(blocked);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Engellenemedi." });
    }
  }
}
