package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.payload.request.UpdetedThemeUserRequest;
import com.openclassrooms.mddapi.repository.UserRepository;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
private final PasswordEncoder passwordEncoder;
    public UserService(UserRepository userRepository,PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.passwordEncoder =passwordEncoder;
    }

    public User sabonner(String id, UpdetedThemeUserRequest updatedUser) {
        return userRepository.findById(Long.valueOf(id)).map(user -> {
            user.getThemes().add(updatedUser.getTheme()); // Met à jour les thèmes
            return userRepository.save(user);
        }).orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
    }

    public User desabonnerUser(String id, UpdetedThemeUserRequest updatedUser) {
        return userRepository.findById(Long.valueOf(id)).map(user -> {
            user.getThemes().remove(updatedUser.getTheme()); // Met à jour les thèmes
            return userRepository.save(user);
        }).orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
    }

    public User update(User user) {
        System.out.println(user.getId() );
        System.out.println(user.getUserName());
       return this.userRepository.findById(user.getId()).map(u->{
            if(StringUtils.isNotBlank( user.getUserName())){
                u.setUserName(user.getUserName());
            }
            if(StringUtils.isNotBlank(user.getEmail())){
                u.setEmail(user.getEmail());
            }
            if(StringUtils.isNotBlank(user.getPassword())){
               u.setPassword(passwordEncoder.encode(user.getPassword()));
            }
            return userRepository.save(u);
        }).orElseThrow(()->new RuntimeException("utilsateur non trouvé"));
    }

    public User findById(Long id) {
        return this.userRepository.findById(id).orElse(null);
    }

}
