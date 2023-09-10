package com.furkanmeydan.PostService.repository;

import com.furkanmeydan.PostService.model.Report;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.ArrayList;

public interface ReportRepository extends MongoRepository<Report, String> {

    @Query("{ 'reporterUserId' : ?0 }")
    public Report findByReporterId(String id);

    @Query("{ 'reportingUserId' : ?0 }")
    public Report findByReportingId(String id);

    @Query("{ 'reporterUserId' : ?0, 'reportingUserId' : ?0 }")
    public ArrayList findBySameUser(String id);



}
