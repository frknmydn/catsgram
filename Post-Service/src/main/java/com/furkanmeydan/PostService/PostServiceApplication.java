package com.furkanmeydan.PostService;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.core.MongoTemplate;

@SpringBootApplication
public class PostServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(PostServiceApplication.class, args);
		System.out.println("Post Service is running...");

	}

	/*
	@Bean
	public CommandLineRunner commandLineRunner(MongoTemplate mongoTemplate) {
		return args -> {
			TestDocument testDocument = new TestDocument("Test Veri", "Bu bir test verisidir.");
			mongoTemplate.save(testDocument);

			// MongoDB'den test belgesini okumak
			TestDocument retrievedDocument = mongoTemplate.findById(testDocument.getId(), TestDocument.class);
			System.out.println("MongoDB'den okunan veri: " + retrievedDocument);
		};
	}

	 */


}
