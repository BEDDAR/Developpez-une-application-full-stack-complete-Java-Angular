package com.openclassrooms.mddapi.payload.request;

import com.openclassrooms.mddapi.models.Theme;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdetedUderRequest {
    private Long id;
    private String type;
    private String userName;
    private String email;
    private Boolean admin;
    private Set<Theme> themes;
}
