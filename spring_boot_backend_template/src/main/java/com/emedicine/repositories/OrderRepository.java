package com.emedicine.repositories;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.emedicine.pojos.Orders;

public interface OrderRepository extends JpaRepository<Orders, Integer>{

	@Query("SELECT o FROM Orders o WHERE o.orderId = :orderId AND o.user.id = :userId")
	Orders findByOrderIdAndUserId(@Param(value = "orderId") Integer orderId ,@Param(value = "userId") Integer userId);
	List<Orders> findByOrderDateGreaterThanEqual(Date orderDate);
	@Query("SELECT o FROM Orders o WHERE o.user.id = :userId")
	List<Orders> getAllOrdersByUserId(@Param(value = "userId") Integer userId);
}
