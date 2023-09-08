package com.furkanmeydan.PostService.repository;

import com.furkanmeydan.PostService.model.Post;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Date;

public interface PostRepository extends MongoRepository<Post, String> {
    public ArrayList<Post> findAllByUserId(String userId);

    public Post findAllByCreatedAtAfter(Date date);
}
