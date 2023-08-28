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

    // Veritabanına kaydetmek için TypeORM kullanın

    try {
      await AppDataSource.manager.save(report);
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

      const report = await reportRepository.findOneBy({
        id: reportId,
      });

      if (!report) {
        // Belirtilen rapor bulunamazsa null döndürün veya hata işleyin
        return null;
      }


      

      // Raporu onaylayın
      report.is_approved = true;
      report.moderator_user_id = moderatorUserId
      report.approved_at = new Date();

      // Veritabanında güncellemeyi kaydetmek için TypeORM kullanın
      await reportRepository.save(report);

      // Güncellenmiş raporu döndürün
      return report;
    } catch (error) {
      throw error;
    }
  }
}
