package com.furkanmeydan.PostService.repository;

import com.furkanmeydan.PostService.model.Post;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Date;
import java.util.Optional;

public interface PostRepository extends MongoRepository<Post, String> {
     ArrayList<Post> findAllByUserId(String userId);

     Post findAllByCreatedAtAfter(Date date);

    @Query("{ 'id' : ?0 }")
     Optional<Post> findById(String id);

    Post save(Post post);



}
