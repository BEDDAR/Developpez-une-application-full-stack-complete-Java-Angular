package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.models.Article;
import com.openclassrooms.mddapi.services.ArticleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/article")
public class ArticleController {
    private ArticleService articleService;

    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @PostMapping
    public ResponseEntity<Article> create(@Valid @RequestBody Article article) {
        return ResponseEntity.ok(this.articleService.createArticle(article));
    }

    @GetMapping
    public ResponseEntity<List<Article>> getAll() {
        return ResponseEntity.ok(this.articleService.getAllArticles());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Article> get(@PathVariable String id){
        return ResponseEntity.ok(this.articleService.getArticlById(id));
    }
}
