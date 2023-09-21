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


}
