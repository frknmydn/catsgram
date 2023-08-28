import { NextFunction, Request, Response } from 'express';
import { ReportService } from '../service/report.service';

class ReportController{
    static async getAllReports(req:Request, res:Response, next:NextFunction){
        const reports = await ReportService.getAllReports();
        res.send(reports)
    }

    static async addReport(req:Request, res:Response, next:NextFunction){
        const {reason, reported_user_id, reporter_user_id, created_at, is_approved, moderator_user_id, approved_at} = req.body;
        const report = await ReportService.addReport(reason, reported_user_id, reporter_user_id, created_at, is_approved, moderator_user_id, approved_at);
        res.send(report);
    }

    static async approveReport(req:Request, res:Response, next:NextFunction){
        const {id, moderator_user_id} = req.body;
        const report = await ReportService.approveReport(id, moderator_user_id)
        res.send(report);
    }
}


export default ReportController;