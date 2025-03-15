package com.openclassrooms.mddapi.models;

import lombok.*;
import lombok.experimental.Accessors;
import org.mapstruct.control.MappingControl;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "Themes")
@EntityListeners(AuditingEntityListener.class)
@Data
@Accessors(chain = true)
@EqualsAndHashCode(of = {"id"})
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Theme {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    private String titre;

    @NotNull
    @Size(max = 2500)
    private String description;

    @OneToMany(mappedBy = "theme", cascade = CascadeType.MERGE) //Permet d'associer des utilisateurs existants à un thème sans les recréer ou les supprimer
    Set<User> abonnes;

    @OneToMany(mappedBy = "theme")
    private List<Article> articles;
}
