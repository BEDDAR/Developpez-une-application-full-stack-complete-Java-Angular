package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.payload.request.UpdetedUserRequest;
import com.openclassrooms.mddapi.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User updateUser(String id, UpdetedUserRequest updatedUser) {
        return userRepository.findById(Long.valueOf(id)).map(user -> {
            user.getThemes().add(updatedUser.getTheme()); // Met à jour les thèmes
            return userRepository.save(user);
        }).orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
    }

    public User desabonnerUser(String id, UpdetedUserRequest updatedUser) {
        return userRepository.findById(Long.valueOf(id)).map(user -> {
            user.getThemes().remove(updatedUser.getTheme()); // Met à jour les thèmes
            return userRepository.save(user);
        }).orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
    }

    public void delete(Long id) {
        this.userRepository.deleteById(id);
    }

    public User findById(Long id) {
        return this.userRepository.findById(id).orElse(null);
    }

}
