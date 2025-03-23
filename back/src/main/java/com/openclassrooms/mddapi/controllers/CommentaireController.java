package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.models.Article;
import com.openclassrooms.mddapi.models.Commentaire;
import com.openclassrooms.mddapi.services.CommentaireService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/commentaire")
public class CommentaireController {

    private CommentaireService commentaireService;

    public CommentaireController(CommentaireService commentaireService) {
        this.commentaireService = commentaireService;
    }

   @PostMapping
   public ResponseEntity<Commentaire> create (@Valid @RequestBody Commentaire commentaire){
       System.out.println(commentaire);
        return  ResponseEntity.ok(this.commentaireService.create(commentaire));
   }
}
