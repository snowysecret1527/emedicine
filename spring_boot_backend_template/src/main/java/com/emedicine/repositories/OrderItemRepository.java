package com.emedicine.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.emedicine.pojos.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Integer>{

}
