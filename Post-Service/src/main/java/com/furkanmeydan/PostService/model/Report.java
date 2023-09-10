package com.furkanmeydan.PostService.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "reports")
public class Report {
    String id;
    String postId;
    String reportingUserId;
    String reporterUserId;
    String reason;
    String createdAt;
    boolean isApproved;


    public Report(String id, String postId, String reportingUserId, String reporterUserId, String reason, String createdAt, boolean isApproved) {
        this.id = id;
        this.postId = postId;
        this.reportingUserId = reportingUserId;
        this.reporterUserId = reporterUserId;
        this.reason = reason;
        this.createdAt = createdAt;
        this.isApproved = isApproved;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPostId() {
        return postId;
    }

    public void setPostId(String postId) {
        this.postId = postId;
    }

    public String getReportingUserId() {
        return reportingUserId;
    }

    public void setReportingUserId(String reportingUserId) {
        this.reportingUserId = reportingUserId;
    }

    public String getReporterUserId() {
        return reporterUserId;
    }

    public void setReporterUserId(String reporterUserId) {
        this.reporterUserId = reporterUserId;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public boolean isApproved() {
        return isApproved;
    }

    public void setApproved(boolean approved) {
        isApproved = approved;
    }

    @Override
    public String toString() {
        return "Report{" +
                "id='" + id + '\'' +
                ", postId='" + postId + '\'' +
                ", reportingUserId='" + reportingUserId + '\'' +
                ", reporterUserId='" + reporterUserId + '\'' +
                ", reason='" + reason + '\'' +
                ", createdAt='" + createdAt + '\'' +
                ", isApproved=" + isApproved +
                '}';
    }
}
