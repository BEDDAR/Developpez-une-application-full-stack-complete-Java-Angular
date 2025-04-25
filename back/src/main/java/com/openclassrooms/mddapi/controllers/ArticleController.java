package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.dto.ArticleDto;
import com.openclassrooms.mddapi.mappers.ArticleMapper;
import com.openclassrooms.mddapi.models.Article;
import com.openclassrooms.mddapi.services.ArticleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/article")
public class ArticleController {
    private ArticleService articleService;
private ArticleMapper articleMapper;
    public ArticleController(ArticleService articleService,ArticleMapper articleMapper) {
        this.articleService = articleService;
        this.articleMapper =articleMapper;
    }

    @PostMapping
    public ResponseEntity<Article> create(@Valid @RequestBody Article article) {
        return ResponseEntity.ok(this.articleService.createArticle(article));
    }

    @GetMapping
    public ResponseEntity<List<ArticleDto>> getAll() {
        return ResponseEntity.ok((this.articleService.getAllArticles())
                .stream().map(article -> {return this.articleMapper.toDto(article);} )
                .collect(Collectors.toList()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ArticleDto> get(@PathVariable String id){
        return ResponseEntity.ok(this.articleMapper.toDto(this.articleService.getArticlById(id)));
    }
}
