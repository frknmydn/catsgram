package com.furkanmeydan.PostService.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "comments")
public class Comment {
    @Id
   private String id;

    private String postId;
    private int commenterId;
    private int postOwnerId;
    private String content;
    private String createdAt;
    private String reportCount;
    private String likeCount;
    private boolean isDeleted;

    public Comment(String id, String postId, int commenterId, int postOwnerId, String content, String createdAt, String reportCount, String likeCount, boolean isDeleted) {
        this.id = id;
        this.postId = postId;
        this.commenterId = commenterId;
        this.postOwnerId = postOwnerId;
        this.content = content;
        this.createdAt = createdAt;
        this.reportCount = reportCount;
        this.likeCount = likeCount;
        this.isDeleted = isDeleted;
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

    public int getCommenterId() {
        return commenterId;
    }

    public void setCommenterId(int commenterId) {
        this.commenterId = commenterId;
    }

    public int getPostOwnerId() {
        return postOwnerId;
    }

    public void setPostOwnerId(int postOwnerId) {
        this.postOwnerId = postOwnerId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getReportCount() {
        return reportCount;
    }

    public void setReportCount(String reportCount) {
        this.reportCount = reportCount;
    }

    public String getLikeCount() {
        return likeCount;
    }

    public void setLikeCount(String likeCount) {
        this.likeCount = likeCount;
    }

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }

    @Override
    public String toString() {
        return "Comment{" +
                "id='" + id + '\'' +
                ", postId='" + postId + '\'' +
                ", commenterId=" + commenterId +
                ", postOwnerId=" + postOwnerId +
                ", content='" + content + '\'' +
                ", createdAt='" + createdAt + '\'' +
                ", reportCount='" + reportCount + '\'' +
                ", likeCount='" + likeCount + '\'' +
                ", isDeleted=" + isDeleted +
                '}';
    }
}
