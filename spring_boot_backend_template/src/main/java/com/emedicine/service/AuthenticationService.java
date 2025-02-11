package com.emedicine.service;


import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.emedicine.dto.LoginUserDto;
import com.emedicine.dto.RegisterUserDto;
import com.emedicine.pojos.Role;
import com.emedicine.pojos.RoleEnum;
import com.emedicine.pojos.User;
import com.emedicine.repositories.RoleRepository;
import com.emedicine.repositories.UserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class AuthenticationService {
@Autowired
private RoleRepository roleRepository;
    private final UserRepository userRepository;
   
    private final PasswordEncoder passwordEncoder;
   
    private final AuthenticationManager authenticationManager;

    public AuthenticationService(
        UserRepository userRepository,
        AuthenticationManager authenticationManager,
        PasswordEncoder passwordEncoder
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User signup(RegisterUserDto input) {
        if (input == null) {
            throw new IllegalArgumentException("Input is null");
        }
        if (input.getFirstName() == null || input.getEmail() == null) {
            throw new IllegalArgumentException("Mandatory fields are null");
        }
        User user = new User();
        user.setFirstName(input.getFirstName());
        user.setLastName(input.getLastName());
        user.setPhoneNumber(input.getPhoneNumber());
        user.setEmail(input.getEmail());
        
        user.setPassword(passwordEncoder.encode(input.getPassword()));
        if (input.getUserRoles() == null || input.getUserRoles().isEmpty()) {
            System.out.println("User roles are empty or null, assigning default role.");
            Role defaultRole = roleRepository.findByRoleName(RoleEnum.USER)
                    .orElseThrow(() -> new RuntimeException("Default role not found"));
            System.out.println("Assigned roles: " + user.getUserRoles());
            user.getUserRoles().add(defaultRole);
            System.out.println("Assigned roles: " + user.getUserRoles());
           
        } else {
        Set<Role> roles = input.getUserRoles().stream()
                .map(roleEnum -> RoleEnum.valueOf(roleEnum.toUpperCase()))  // Convert String to RoleEnum
                .map(roleEnum -> roleRepository.findByRoleName(roleEnum)
                        .orElseThrow(() -> new RuntimeException("Role not found: " + roleEnum)))
                .collect(Collectors.toSet());
        user.setUserRoles(roles);  // Assign the collected roles to the user
        System.out.println("Assigned roles: " + roles);
        }
        return userRepository.save(user);
    }

    public User authenticate(LoginUserDto input) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getEmail(),
                        input.getPassword()
                )
        );
User user= userRepository.findByEmail(input.getEmail())
.orElseThrow();
        return user;
    }
}
