package com.openclassrooms.mddapi.mappers;

import com.openclassrooms.mddapi.dto.CommentaireDto;
import com.openclassrooms.mddapi.dto.UserDto;
import com.openclassrooms.mddapi.models.Commentaire;
import com.openclassrooms.mddapi.models.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public abstract class CommentaireMapper implements EntityMapper<CommentaireDto, Commentaire>{

    @Autowired
    UserMapper userMapper;

    @Named("auteurToDto")
    public UserDto auteurToDto(User auteur){
        return this.userMapper.toDto(auteur);
    }
    @Mappings({
            @Mapping(source = "contenu",target = "contenu"),
            @Mapping(source = "auteur",target = "auteur",qualifiedByName ="auteurToDto" )
    })
    public abstract CommentaireDto toDto(Commentaire commentaire);
}
