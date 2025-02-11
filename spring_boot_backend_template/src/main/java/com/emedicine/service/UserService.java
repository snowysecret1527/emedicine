package com.emedicine.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.emedicine.pojos.User;
import com.emedicine.repositories.UserRepository;

public class UserService {
	@Autowired
	private UserRepository userRepository;
	public List<User> allUsers() {
        List<User> users = new ArrayList<>();

        userRepository.findAll().forEach(users::add);

        return users;
    }
}
