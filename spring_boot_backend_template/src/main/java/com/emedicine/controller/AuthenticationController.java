package com.emedicine.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.emedicine.custom_exceptions.AuthenticationException;
import com.emedicine.dto.LoginResponse;
import com.emedicine.dto.LoginUserDto;
import com.emedicine.dto.RegisterUserDto;
import com.emedicine.pojos.User;
import com.emedicine.security.JwtService;
import com.emedicine.service.AuthenticationService;




@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class AuthenticationController {
    private final JwtService jwtService;
   
    private final AuthenticationService authenticationService;
    
    

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/signup")
    public ResponseEntity<User> register(@RequestBody RegisterUserDto registerUserDto) {
        User registeredUser = authenticationService.signup(registerUserDto);

        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticate(@RequestBody LoginUserDto loginUserDto) {
    
        try {
        User authenticatedUser = authenticationService.authenticate(loginUserDto);
        System.out.println(authenticatedUser.getPassword());
        String jwtToken = jwtService.generateToken(authenticatedUser);
        System.out.println(authenticatedUser.getId());
        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setToken(jwtToken);
        loginResponse.setExpiresIn(jwtService.getExpirationTime());
    loginResponse.setUserId(authenticatedUser.getId());
        return ResponseEntity.ok(loginResponse);
        }
        catch (AuthenticationException e) {
            // Handle authentication exceptions (e.g., invalid credentials)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials.");
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred. Please try again later.");
        }
    }
}
