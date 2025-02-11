package com.emedicine.service;

import java.util.List;

import com.emedicine.custom_exceptions.CartException;
import com.emedicine.pojos.Cart;
import com.emedicine.pojos.Medicine;

public interface CartService {

public Cart addProductToCart(Integer userId, Integer productId) throws CartException;

public Cart increaseProductQuantity(Integer userId, Integer productId) throws CartException;
public Cart decreaseProductQuantity(Integer userId, Integer productId) throws CartException;
public void removeProductFromCart(Integer cartId,Integer productId) throws CartException;

public void removeAllProductFromCart(Integer cartId) throws CartException;

//public List<Cart> getAllCartProduct()throws CartException;

public Cart getAllCartProduct(Integer userId)throws CartException;


}
