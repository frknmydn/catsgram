package com.furkanmeydan.PostService.repository;

import com.furkanmeydan.PostService.model.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.ArrayList;

public interface CommentRepository extends MongoRepository<Comment, String> {

    ArrayList<Comment> findByPostId(String postId);


}
