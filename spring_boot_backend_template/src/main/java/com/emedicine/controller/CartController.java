package com.emedicine.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.emedicine.pojos.Cart;
import com.emedicine.pojos.Medicine;
import com.emedicine.service.CartService;

import lombok.RequiredArgsConstructor;

@CrossOrigin
@RestController
@RequestMapping("/emedicine/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @PostMapping("/add-product/{userId}/{productId}")
    public ResponseEntity<Cart> addProductToCart(@PathVariable Integer userId, @PathVariable Integer productId) {
        Cart cart = cartService.addProductToCart(userId, productId);
        return ResponseEntity.status(HttpStatus.CREATED).body(cart);
    }

    @PutMapping("/increase-productQty/{cartId}/{productId}")
    public ResponseEntity<Cart> increaseProductQuantity(
            @PathVariable Integer cartId,
            @PathVariable Integer productId) {
        try {
            Cart updatedCart = cartService.increaseProductQuantity(cartId, productId);
            return ResponseEntity.ok(updatedCart);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/decrease-productQty/{cartId}/{productId}")
    public ResponseEntity<Cart> decreaseProductQuantity(@PathVariable Integer cartId, @PathVariable Integer productId) {
        Cart cart = cartService.decreaseProductQuantity(cartId, productId);
        return ResponseEntity.ok(cart);
    }

    @DeleteMapping("/remove-product/{cartId}/{productId}")
    public ResponseEntity<String> removeProductFromCart(@PathVariable Integer cartId, @PathVariable Integer productId) {
        cartService.removeProductFromCart(cartId, productId);
        return ResponseEntity.ok("Product removed from cart.");
    }

    @DeleteMapping("/empty-cart/{cartId}")
    public ResponseEntity<String> removeAllProductFromCart(@PathVariable Integer cartId) {
        cartService.removeAllProductFromCart(cartId);
        return ResponseEntity.ok("All products removed from cart.");
    }

//    @GetMapping("/products")
//    public ResponseEntity<?> getAllCartProducts() {
//        try {
//        	List<Cart> cart = cartService.getAllCartProduct();
//        	System.out.println("Cart");
//        	System.out.println(cart);
//            return ResponseEntity.ok(cart);
//        }catch(Exception ex)
//        {
//        	System.out.println(ex.getMessage());
//        }
//        return null;
//    }
    
    @GetMapping("/products/{cartId}")
    public ResponseEntity<?> getAllCartProducts(@PathVariable Integer cartId) {
    	try {
    		//Integer cartid=Integer.parseInt(cartId);
    		Cart products = cartService.getAllCartProduct(cartId);
            System.out.println(products);
            return ResponseEntity.ok(products);
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
        return null;
    }
 }
