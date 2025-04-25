package com.openclassrooms.mddapi.mappers;

import com.openclassrooms.mddapi.dto.ArticleDto;
import com.openclassrooms.mddapi.dto.CommentaireDto;
import com.openclassrooms.mddapi.dto.UserDto;
import com.openclassrooms.mddapi.models.Article;
import com.openclassrooms.mddapi.models.Commentaire;
import com.openclassrooms.mddapi.models.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
@Mapper(componentModel = "spring",uses = {UserMapper.class, CommentaireMapper.class})
public abstract class ArticleMapper implements EntityMapper<ArticleDto, Article> {

    @Autowired
    CommentaireMapper commentaireMapper;

    @Named("toAuteurDto")
    public UserDto auteurToDto(User auteur){
        return this.commentaireMapper.auteurToDto(auteur);
    }

    @Named("commentairToDto")
    public List<CommentaireDto> commentairToDto(List<Commentaire> commentaires) {
        if (!commentaires.isEmpty()) {
            return commentaires.stream()
                    .map(commentaire -> {
                        return this.commentaireMapper.toDto(commentaire);
                    })
                    .collect(Collectors.toList());
        }
        return null;
    }

    @Mappings({
            @Mapping(source = "titre", target = "titre"),
            @Mapping(source = "contenu", target = "contenu"),
            @Mapping(source = "theme", target = "theme"),
            @Mapping(target = "auteur",source = "auteur", qualifiedByName = "toAuteurDto"),
            @Mapping(target = "commentaires", source = "commentaires", qualifiedByName = "commentairToDto"),
    })
    public abstract ArticleDto toDto(Article article);
}
