package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.mappers.UserMapper;
import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.payload.request.UpdetedThemeUserRequest;
import com.openclassrooms.mddapi.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserMapper userMapper;
    private final UserService userService;


    public UserController(UserService userService,
                          UserMapper userMapper) {
        this.userMapper = userMapper;
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") String id) {
        try {
            User user = this.userService.findById(Long.valueOf(id));

            if (user == null) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok().body(this.userMapper.toDto(user));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable("id") String id, @RequestBody UpdetedThemeUserRequest updatedUser) {

            User updated = userService.sabonner(id, updatedUser);
            return ResponseEntity.ok(this.userMapper.toDto(updated));
    }

    @PutMapping("/desabonner/{id}")
    public ResponseEntity<?> desabonnerUser(@PathVariable("id") String id, @RequestBody UpdetedThemeUserRequest updatedUser) {

        User updated = userService.desabonnerUser(id, updatedUser);
        return ResponseEntity.ok(this.userMapper.toDto(updated));
    }

     @PutMapping
    public ResponseEntity<?> update(@RequestBody User user){
        return ResponseEntity.ok(this.userMapper.toDto(this.userService.update(user)));
     }

}
