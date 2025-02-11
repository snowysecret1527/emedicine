package com.emedicine.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


import com.emedicine.pojos.User;


public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);
    Optional<User> findByPhoneNumber(String phone);
}

