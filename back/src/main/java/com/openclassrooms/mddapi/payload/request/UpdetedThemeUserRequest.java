package com.openclassrooms.mddapi.payload.request;

import com.openclassrooms.mddapi.models.Theme;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdetedThemeUserRequest {

    private Theme theme;
}
