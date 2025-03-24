package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.dto.CommentaireDto;
import com.openclassrooms.mddapi.mappers.CommentaireMapper;
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
    private CommentaireMapper commentaireMapper;

    public CommentaireController(CommentaireService commentaireService,CommentaireMapper commentaireMapper) {
        this.commentaireService = commentaireService;
        this.commentaireMapper=commentaireMapper;
    }

   @PostMapping
   public ResponseEntity<CommentaireDto> create (@Valid @RequestBody Commentaire commentaire){
       System.out.println(commentaire);
       Commentaire commentaireCree= this.commentaireService.create(commentaire);
        return  ResponseEntity.ok().body(this.commentaireMapper.toDto(commentaireCree));
   }
}
