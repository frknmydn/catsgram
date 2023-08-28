import express from 'express'
import { checkUserType } from '../middleware/currentUser';
import ReportController from '../controller/report.controller';


const router = express.Router();


router.get("/getallreports",ReportController.getAllReports);
router.post("/addreport", ReportController.addReport);
router.put("/:id/approve",ReportController.approveReport);

export default router;