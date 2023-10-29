package com.furkanmeydan.PostService.service;

import com.furkanmeydan.PostService.model.Comment;
import com.furkanmeydan.PostService.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;

public class CommentService {

    @Autowired
    private PostService postService;
    @Autowired
    private CommentRepository commentRepository;

    public Comment createComment(Comment comment){

        boolean isBanned = postService.isUserBanned(comment.getCommenterId());
        if(isBanned){
            throw new RuntimeException("User is banned");
        }
        return commentRepository.save(comment);
    }

    private ArrayList<Comment> getPostComments(String postId){
        return commentRepository.findByPostId(postId);
    }

    public Comment getCommentById(String id){
        return commentRepository.findById(id).orElse(null);
    }

    public Comment updateComment(Comment comment){
        return commentRepository.save(comment);
    }

    public void deleteComment(String id){
        commentRepository.deleteById(id);
    }

    public void likeComment(String id){
        Comment comment = commentRepository.findById(id).orElse(null);
        if(comment != null){
            comment.setLikeCount(comment.getLikeCount() + 1);
            commentRepository.save(comment);
        }
    }

    public void reportComment(String id){
        Comment comment = commentRepository.findById(id).orElse(null);
        if(comment != null){
            comment.setReportCount(comment.getReportCount() + 1);
            commentRepository.save(comment);
        }
    }

    public void deleteCommentWithParameter(String id) {
        Comment comment = commentRepository.findById(id).orElse(null);
        if (comment != null) {
            comment.setDeleted(true);
            commentRepository.save(comment);
        }
    }



}
