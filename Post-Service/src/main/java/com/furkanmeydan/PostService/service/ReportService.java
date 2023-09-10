package com.furkanmeydan.PostService.service;

import com.furkanmeydan.PostService.model.Report;
import com.furkanmeydan.PostService.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class ReportService {

    @Autowired
    private ReportRepository reportRepository;

    public Report createReport(Report report){
        return reportRepository.save(report);
    }

    public Report getReportById(String id){
        return reportRepository.findById(id).orElse(null);
    }

    public Report approveReport(String id){
        Report report = reportRepository.findById(id).orElse(null);
        if(report != null){

            report.setApproved(true);
            return reportRepository.save(report);
        }
        throw new RuntimeException("Report not found");

    }

    public Report getReportByReporterId(String id){
        return reportRepository.findByReporterId(id);
    }

    public Report getReportByReportingId(String id){
        return reportRepository.findByReportingId(id);
    }

    public ArrayList<Report> getReportsBySameUser(String id){
        return reportRepository.findBySameUser(id);
    }
}
