package com.emedicine.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.emedicine.dto.RegisterUserDto;
import com.emedicine.dto.UserDto;
import com.emedicine.pojos.User;
import com.emedicine.service.CustomerServiceImpl;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/emedicine/customers")
public class UserController {

    private final CustomerServiceImpl userService;

    private final PasswordEncoder passwordEncoder;

//    @PostMapping("/add")
//    public ResponseEntity<User> addUser(@Valid @RequestBody RegisterUserDto user) {
//
//        user.setPassword(passwordEncoder.encode(user.getPassword()));
//        User addedUser = userService.addUser(user);
//        return ResponseEntity.ok(addedUser);
//    }

//    @PutMapping("/update-password/{customerId}")
//    public ResponseEntity<User> updateUserPassword(@PathVariable("customerId") Integer customerId,
//                                                  @Valid @RequestBody UserDto userdto) {
//        User updatedUser = userService.changePassword(customerId, userdto);
//        return ResponseEntity.ok(updatedUser);
//    }

    @DeleteMapping("/deactivate/{customerid}")
    public ResponseEntity<String> deactivateUser(@PathVariable("customerid") Integer customerId) {
        System.out.println("inside the deactivate method");
        String message = userService.deactivateUser(customerId);
        return ResponseEntity.ok(message);
    }

    @GetMapping("/{customerid}")
    public ResponseEntity<User> getUserDetails(@PathVariable("customerid") Integer customerId) {
        User user = userService.getUserDetails(customerId);
        return ResponseEntity.ok(user);
    }

    
    @GetMapping("/{email}")
    public ResponseEntity<User> getUserDetails(@PathVariable("email") String emailId) {
        User user = userService.getUserByEmailId(emailId);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/get-all-customer")
    public ResponseEntity<List<User>> getAllUserDetails() {
        List<User> users = userService.getAllUserDetails();
        return ResponseEntity.ok(users);
    }

}
