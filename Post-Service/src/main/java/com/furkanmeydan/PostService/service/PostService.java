package com.furkanmeydan.PostService.service;

import com.furkanmeydan.PostService.model.Post;
import com.furkanmeydan.PostService.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    public Post createPost(Post post){
        System.out.println(post);
        return postRepository.save(post);
    }

    public  Post getPostById(String id){
        return postRepository.findById(id).get();
    }

    public Post updatePost(Post post){
        return postRepository.save(post);
    }

    public void deletePost(String id){
        postRepository.deleteById(id);
    }

    public void likePost(String id){
        Post post = postRepository.findById(id).get();
        post.setLikeCount(post.getLikeCount()+1);
        postRepository.save(post);
    }

    public void commentPost(String id){
        Post post = postRepository.findById(id).get();
        post.setCommentCount(post.getCommentCount()+1);
        postRepository.save(post);
    }


    public void viewPost(String id){
        Post post = postRepository.findById(id).get();
        post.setViewCount(post.getViewCount()+1);
        postRepository.save(post);
    }

    public void sharePost(String id){
        Post post = postRepository.findById(id).get();
        post.setShareCount(post.getShareCount()+1);
        postRepository.save(post);
    }

    public void reportPost(String id){
        Post post = postRepository.findById(id).get();
        post.setReportCount(post.getReportCount()+1);
        postRepository.save(post);
    }

    public void deletePostWithParameter(String id){
        Post post = postRepository.findById(id).get();
        post.setDeleted(true);
        post.setDeletedAt(new Date());
        postRepository.save(post);
    }

    public ArrayList<Post> getPostsByUserId(String userId){
        return  postRepository.findAllByUserId(userId);
    }

    public void getPostsByTime(Date date){
        postRepository.findAllByCreatedAtAfter(date);
    }


}
