package com.openclassrooms.mddapi.mappers;

import com.openclassrooms.mddapi.dto.CommentaireDto;
import com.openclassrooms.mddapi.models.Commentaire;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface CommentaireMapper extends EntityMapper<CommentaireDto, Commentaire>{
}
