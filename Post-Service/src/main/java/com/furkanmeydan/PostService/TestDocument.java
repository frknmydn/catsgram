package com.furkanmeydan.PostService;

import org.springframework.data.annotation.Id;

public class TestDocument {
    @Id
    private String id;
    private String title;
    private String content;

    public TestDocument(){}

    public String getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public TestDocument(String title, String content){
        this.title = title;
        this.content = content;
    }

}
