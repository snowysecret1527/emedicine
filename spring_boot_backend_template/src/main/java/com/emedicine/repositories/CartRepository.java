package com.emedicine.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.emedicine.pojos.Cart;

public interface CartRepository extends JpaRepository<Cart, Integer>{

}
