package com.emedicine.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.emedicine.pojos.CartItem;

import jakarta.transaction.Transactional;

public interface CartItemRepository extends JpaRepository<CartItem, Integer>{

@Transactional
@Modifying
@Query("DELETE FROM CartItem ci WHERE ci.cart.cartId = :cartId AND ci.medicine.productId = :productId")
public void removeProductFromCart(@Param("cartId") Integer cartId, @Param("productId") Integer productId);

@Transactional
@Modifying
@Query("DELETE FROM CartItem ci WHERE ci.cart.cartId = :cartId ")
public void removeAllProductFromCart(@Param("cartId") Integer cartId);

}

