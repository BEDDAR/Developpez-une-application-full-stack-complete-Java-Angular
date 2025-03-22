package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.models.Article;
import com.openclassrooms.mddapi.repository.ArticleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArticleService {
    private ArticleRepository articleRepository;

    public ArticleService(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    public Article createArticle(Article article) {
        return this.articleRepository.save(article);
    }

    public List<Article> getAllArticles() {
        return this.articleRepository.findAll();
    }

    public Article getArticlById(String id) {
        return this.articleRepository.findById(Long.valueOf(id)).orElse(null);
    }
}
