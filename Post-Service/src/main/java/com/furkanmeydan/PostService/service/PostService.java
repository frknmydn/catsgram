package com.furkanmeydan.PostService.service;

import com.furkanmeydan.PostService.model.Post;
import com.furkanmeydan.PostService.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Date;
import java.util.Optional;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public Post createPost(Post post) {
        int userId = post.getUserId();
        /*
         boolean isBanned = isUserBanned(userId);

         if(isBanned){
             throw new RuntimeException("User is banned");
         }
*/
        return postRepository.save(post);
    }

    public Post getPostById(String id){
        return postRepository.findById(id).orElse(null);
    }

    public Post updatePost(Post post){
        return postRepository.save(post);
    }

    public void deletePost(String id){
        postRepository.deleteById(id);
    }

    public void likePost(String id){
        Optional<Post> postOptional = postRepository.findById(id);
        if (postOptional.isPresent()) {
            Post post = postOptional.get();
            post.setLikeCount(post.getLikeCount() + 1);
            postRepository.save(post);
        }
    }

    public void commentIncrementPost(String id){
        Optional<Post> postOptional = postRepository.findById(id);
        if (postOptional.isPresent()) {
            Post post = postOptional.get();
            post.setCommentCount(post.getCommentCount() + 1);
            postRepository.save(post);
        }
    }

    public void viewPost(String id){
        Optional<Post> postOptional = postRepository.findById(id);
        if (postOptional.isPresent()) {
            Post post = postOptional.get();
            post.setViewCount(post.getViewCount() + 1);
            postRepository.save(post);
        }
    }

    public void sharePost(String id){
        Optional<Post> postOptional = postRepository.findById(id);
        if (postOptional.isPresent()) {
            Post post = postOptional.get();
            post.setShareCount(post.getShareCount() + 1);
            postRepository.save(post);
        }
    }

    public void reportPost(String id){
        Optional<Post> postOptional = postRepository.findById(id);
        if (postOptional.isPresent()) {
            Post post = postOptional.get();
            post.setReportCount(post.getReportCount() + 1);
            postRepository.save(post);
        }
    }

    public void deletePostWithParameter(String id){
        try {

            Optional<Post> postOptional = postRepository.findById(id);
            if (postOptional.isPresent()) {

                Post post = postOptional.get();
                post.setDeleted(true);
                post.setDeletedAt(new Date());
                postRepository.save(post);
            } else {
                // Handle the case when the post with the provided ID doesn't exist.
                // You can throw an exception or return an appropriate response.
            }
        } catch (IllegalArgumentException e) {
            // Handle the case when the provided id is not a valid ObjectId
            System.out.println("Invalid id");
        }

    }

    public ArrayList<Post> getPostsByUserId(String userId){
        return  postRepository.findAllByUserId(userId);
    }

    public boolean isUserBanned(int userId) {
        // Kullanıcı kimliği
        RestTemplate restTemplate = new RestTemplate();
        String banCheckUrl = "http://localhost:3001/api/profile/isuserbanned/{userId}";

        // Kullanıcı yasaklı mı kontrol edin
        ResponseEntity<Boolean> response = restTemplate.exchange(
                banCheckUrl,
                HttpMethod.GET,
                null,
                Boolean.class,
                userId
        );

        // Yanıtı kontrol et
        if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
            return response.getBody();
        } else {
            return false;
        }
    }


    public void getPostsByTime(Date date){
        postRepository.findAllByCreatedAtAfter(date);
    }
}
