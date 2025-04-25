package com.openclassrooms.mddapi.dto;

import com.openclassrooms.mddapi.models.Commentaire;
import com.openclassrooms.mddapi.models.Theme;
import com.openclassrooms.mddapi.models.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ArticleDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    private String titre;

    @NotNull
    @Size(max = 2500)
    private String contenu;

    private UserDto auteur;

    @NotNull
    private Theme theme;

    List<CommentaireDto> commentaires;

    private LocalDateTime createdAt;

}
