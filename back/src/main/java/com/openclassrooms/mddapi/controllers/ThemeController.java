package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.models.Theme;
import com.openclassrooms.mddapi.services.ThemeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/theme")
public class ThemeController {

    private ThemeService themeService;

    public ThemeController(ThemeService themeService) {
        this.themeService = themeService;
    }

    @PostMapping
    public ResponseEntity<Theme> create(@Valid @RequestBody Theme theme) {
        System.out.println("requète reçue");
        return ResponseEntity.ok(this.themeService.createTheme(theme));
    }

    @GetMapping
    public ResponseEntity<List<Theme>> getAll(){
        return ResponseEntity.ok(this.themeService.getThemes());
    }
}
