package com.furkanmeydan.PostService.controller;

import com.furkanmeydan.PostService.model.Post;
import com.furkanmeydan.PostService.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Map;


@Controller
@RestController
@RequestMapping("/api/post")
public class PostController {
    @Autowired
    private PostService postService;

    @PostMapping("/create")
    public Post createPost(@RequestBody Post post){
        return postService.createPost(post);
    }

    @GetMapping("/get/{id}")
    public Post getPostById(String id){
        return postService.getPostById(id);
    }


    @PutMapping("/update")
    public Post updatePost(Post post){
        return postService.updatePost(post);
    }

    @DeleteMapping("/delete/{id}")
    public void deletePost(String id){
        postService.deletePost(id);
    }

    @PutMapping("/like/{id}")
    public void likePost(String id){
        postService.likePost(id);
    }

    @PutMapping("/comment/{id}")
    public void commentPost(String id){
        postService.commentPost(id);
    }


    @PutMapping("/report/{id}")
    public void reportPost(String id){
        postService.reportPost(id);
    }


    @PutMapping("/delete/{id}")
    public void deletePostWithParameter(String id){
        postService.deletePostWithParameter(id);
    }

    @GetMapping("/getPostsByUserId")
    public ArrayList<Post> getPostsByUserId(@RequestBody Map<String, String> requestBody) {
        String userId = requestBody.get("userId");
        return postService.getPostsByUserId(userId);
    }


}


