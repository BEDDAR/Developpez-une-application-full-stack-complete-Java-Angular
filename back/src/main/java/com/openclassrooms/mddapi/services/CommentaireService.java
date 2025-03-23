package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.models.Article;
import com.openclassrooms.mddapi.models.Commentaire;
import com.openclassrooms.mddapi.repository.CommentaireRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentaireService {
    private CommentaireRepository commentaireRepository;

    public CommentaireService(CommentaireRepository commentaireRepository){
        this.commentaireRepository = commentaireRepository;
    }

    public Commentaire create( Commentaire commentaire){
        return this.commentaireRepository.save(commentaire);
    }

}
