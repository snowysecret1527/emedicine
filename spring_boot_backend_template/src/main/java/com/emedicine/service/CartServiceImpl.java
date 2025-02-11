package com.emedicine.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.emedicine.custom_exceptions.CartException;
import com.emedicine.custom_exceptions.MedicineException;
import com.emedicine.custom_exceptions.UserException;
import com.emedicine.pojos.Cart;
import com.emedicine.pojos.CartItem;
import com.emedicine.pojos.Medicine;
import com.emedicine.pojos.User;
import com.emedicine.repositories.CartItemRepository;
import com.emedicine.repositories.CartRepository;
import com.emedicine.repositories.MedicineRepository;
import com.emedicine.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

private final MedicineRepository productRepository;

private final CartRepository cartRepository;

private final CartItemRepository cartItemRepository;

private final UserRepository userRepository;

public Cart addProductToCart(Integer userId, Integer productId) throws CartException {
    Medicine existingProduct = productRepository.findById(productId)
            .orElseThrow(() -> new MedicineException("Product not available in stock."));

    User existingUser = userRepository.findById(userId)
            .orElseThrow(() -> new UserException("User not found in the database."));

    Cart userCart = existingUser.getCart();

    if (userCart == null) {
        userCart = new Cart();
        userCart.setUser(existingUser);
        existingUser.setCart(userCart);
    }

    // Check if the product already exists in the cart
    boolean productExists = userCart.getCartItems().stream()
            .anyMatch(item -> item.getMedicine().getProductId().equals(productId));

    if (productExists) {
        throw new CartException("Product already in the cart. Please increase the quantity.");
    }

    CartItem cartItem = new CartItem();
    cartItem.setMedicine(existingProduct);
    cartItem.setQuantity(1);
    cartItem.setCart(userCart);
    userCart.getCartItems().add(cartItem);

    userCart.setTotalAmount(calculateCartTotal(userCart.getCartItems()));
    cartRepository.save(userCart);
    userCart.getCartItems().forEach(item -> item.getMedicine().getName());  
    return userCart;
}
private double calculateCartTotal(List<CartItem> cartItems) {
    return cartItems.stream()
            .mapToDouble(item -> item.getMedicine().getPrice() * item.getQuantity())
            .sum();
}
@Override
public Cart increaseProductQuantity(Integer cartId, Integer productId) throws CartException {
    User existingUser = userRepository.findById(cartId)
        .orElseThrow(() -> new UserException("User Not Found in Database"));

    if (existingUser.getCart() == null) {
        throw new CartException("Cart Not Found");
    }

    Cart userCart = existingUser.getCart();
    List<CartItem> cartItems = userCart.getCartItems();

    CartItem cartItemToUpdate = cartItems.stream()
        .filter(item -> item.getMedicine().getProductId().equals(productId)
                && item.getCart().getCartId().equals(userCart.getCartId()))
        .findFirst()
        .orElseThrow(() -> new CartException("Cart Item Not Found"));

    int quantity = cartItemToUpdate.getQuantity();
    cartItemToUpdate.setQuantity(quantity + 1);
   
    userCart.setTotalAmount(calculateCartTotal(cartItems));
    cartRepository.save(userCart);

    return userCart;
}

@Override
public Cart decreaseProductQuantity(Integer userId, Integer productId) throws CartException {
    User existingUser = userRepository.findById(userId)
            .orElseThrow(() -> new UserException("User not found in the database."));

    Cart userCart = existingUser.getCart();
    if (userCart == null) {
        throw new CartException("Cart not found.");
    }

    CartItem cartItemToUpdate = userCart.getCartItems().stream()
            .filter(item -> item.getMedicine().getProductId().equals(productId))
            .findFirst()
            .orElseThrow(() -> new CartException("Cart item not found."));

    if (cartItemToUpdate.getQuantity() <= 1) {
        throw new CartException("Quantity cannot be decreased further.");
    }

    cartItemToUpdate.setQuantity(cartItemToUpdate.getQuantity() - 1);
    userCart.setTotalAmount(calculateCartTotal(userCart.getCartItems()));
    cartRepository.save(userCart);
    return userCart;
}

@Override
public void removeProductFromCart(Integer cartId, Integer productId) throws CartException {
    Cart existingCart = cartRepository.findById(cartId)
            .orElseThrow(() -> new CartException("Cart not found."));

    CartItem cartItem = existingCart.getCartItems().stream()
            .filter(item -> item.getMedicine().getProductId().equals(productId))
            .findFirst()
            .orElseThrow(() -> new CartException("Product not found in the cart."));

    existingCart.getCartItems().remove(cartItem);
    existingCart.setTotalAmount(calculateCartTotal(existingCart.getCartItems()));
    cartRepository.save(existingCart);
}

@Override
public void removeAllProductFromCart(Integer cartId) throws CartException {
    Cart existingCart = cartRepository.findById(cartId)
            .orElseThrow(() -> new CartException("Cart not found."));

    if (existingCart.getCartItems().isEmpty()) {
        throw new CartException("Cart is already empty.");
    }
    existingCart.getCartItems().clear();
    existingCart.setTotalAmount(0.0);
    cartRepository.save(existingCart);
}
//@Override
//public List<Cart> getAllCartProduct() throws CartException {
//   List<Cart> existingCart = cartRepository.findAll();
//    if (existingCart.isEmpty()) {
//        throw new CartException("Cart is empty.");
//    }
//    System.out.println(existingCart);
//    return existingCart;
//}

//@Override
//public Cart getAllCartProduct(Integer cartId) throws CartException {
//	Cart existingCart = cartRepository.findById(cartId).orElseThrow(() -> new CartException("Cart Not Found"));
//
//	List<CartItem> cartItems = existingCart.getCartItems();
//	List<Medicine> products = new ArrayList<>();
//
//	for (CartItem cartItem : cartItems) {
//		if (cartItem.getCart().getCartId() == cartId) {
//			Medicine product = cartItem.getMedicine();
//			products.add(product);
//		}
//	}
//	if(products.isEmpty()){
//		throw new CartException("Cart is Empty...");
//	}
//	return existingCart;
//}

public Cart getAllCartProduct(Integer cartId) throws CartException {
    Cart existingCart = cartRepository.findById(cartId)
            .orElseThrow(() -> new CartException("Cart Not Found"));
    if (existingCart.getCartItems().isEmpty()) {
        throw new CartException("Cart is empty.");
    }
    return existingCart;
}

}