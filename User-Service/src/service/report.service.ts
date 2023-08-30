import { MoreThan } from "typeorm";
import { AppDataSource } from "../data-source";
import { profile_report } from "../entity/ProfileReport";

export class ReportService {
  static async getAllReports(): Promise<profile_report[]> {
    try {
      const reports = await AppDataSource.manager.find(profile_report); // Tüm kullanıcıları veritabanından alın
      return reports;
    } catch (error) {
      throw error;
    }
  }

  static async addReport(
    reason: string,
    reportedUserId: number,
    reporterUserId: number,
    created_at: Date,
    isApproved: boolean,
    moderatorUserId: number,
    approved_at: Date
  ): Promise<profile_report> {
    // Yeni bir ProfileReport nesnesi oluşturun
    const report = new profile_report();
    report.reason = reason;
    report.reported_user_id = reportedUserId;
    report.reporter_user_id = reporterUserId;
    report.created_at = created_at;
    report.is_approved = isApproved;
    report.moderator_user_id = moderatorUserId;
    report.approved_at = approved_at;

    

    try {
      await AppDataSource.manager.save(report);

      //todo: buraya rabbitmq ile notificaiton service'e notification gitmesi lazım moderator ve adminlere bir kullanıcının reportlandığına dair
      return report;
    } catch (error) {
      throw error;
    }
  }

  static async approveReport(
    reportId: number,
    moderatorUserId: number
  ): Promise<profile_report | null> {
    // İlgili raporu veritabanından bulun
    try {
      const reportRepository =
        AppDataSource.manager.getRepository(profile_report);

        //todo: kullanıcıya reportCount ekle
        //todo: kullanıcıya report edildiğine dair bilgilendirme mesajı gönder

      const report = await reportRepository.findOneBy({
        id: reportId,
      });

      if (!report) {
        // Belirtilen rapor bulunamazsa null döndür
        return null;
      }

      // Raporu onaylayın
      report.is_approved = true;
      report.moderator_user_id = moderatorUserId
      report.approved_at = new Date();

      
      await reportRepository.save(report);

      // Güncellenmiş rapor
      return report;
    } catch (error) {
      throw error;
    }
  }
}
