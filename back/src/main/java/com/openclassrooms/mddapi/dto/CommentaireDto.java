package com.openclassrooms.mddapi.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.openclassrooms.mddapi.models.Article;
import com.openclassrooms.mddapi.models.User;
import lombok.*;
import lombok.experimental.Accessors;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;



@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentaireDto {


    private Long id;

    @NotNull
    @Size(max = 2500)
    private String contenu;

    private User auteur;

    @JsonIgnore
    private Article article;

    private LocalDateTime createdAt;
}
