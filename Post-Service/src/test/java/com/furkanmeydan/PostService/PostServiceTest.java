package com.furkanmeydan.PostService;

import com.furkanmeydan.PostService.model.Post;
import com.furkanmeydan.PostService.repository.PostRepository;
import com.furkanmeydan.PostService.service.PostService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class PostServiceTest {



    @Mock
    private PostRepository postRepository;
    @InjectMocks
    private PostService postService;


    @Test
    void testCreatePost(){
        Post post = new Post();
        post.setUserId(1);
        post.setTitle("Test Post");
        post.setContent("This is a test post.");

        when(postRepository.save(post)).thenReturn(post);

        // Create the post
        Post createdPost = postService.createPost(post);

        // Assert that the post was created successfully
        assertNotNull(createdPost);
        assertEquals(1, createdPost.getUserId());
        assertEquals("Test Post", createdPost.getTitle());
        assertEquals("This is a test post.", createdPost.getContent());
    }
    /*

    @Test
    void testUpdatePost() {
        // Create a new Post object
        Post post = new Post();
        post.setUserId(1);
        post.setTitle("Test Post");
        post.setContent("This is a test post.");

        // Create the post
        Post createdPost = postService.createPost(post);

        // Update the post
        createdPost.setTitle("Updated Post");
        createdPost.setContent("This is an updated test post.");
        Post updatedPost = postService.updatePost(createdPost);

        // Assert that the post was updated successfully
        assertNotNull(updatedPost);
        assertEquals(createdPost.getId(), updatedPost.getId());
        assertEquals(createdPost.getUserId(), updatedPost.getUserId());
        assertEquals("Updated Post", updatedPost.getTitle());
        assertEquals("This is an updated test post.", updatedPost.getContent());
    }

    @Test
    void testDeletePost() {
        // Create a new Post object
        Post post = new Post();
        post.setUserId(1);
        post.setTitle("Test Post");
        post.setContent("This is a test post.");

        // Create the post
        Post createdPost = postService.createPost(post);

        // Delete the post
        postService.deletePost(createdPost.getId());

        // Assert that the post was deleted successfully
        assertNull(postService.getPostById(createdPost.getId()));
    }

     */
}
