package com.openclassrooms.mddapi.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.openclassrooms.mddapi.models.Theme;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.validation.constraints.Email;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

    private Long id;

    @Size(max = 50)
    @Email
    private String email;


    @Size(max = 20)
    private String userName;

    private boolean admin;

    @JsonIgnore
    @Size(max = 120)
    private String password;

    private Set<Theme> themes;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
