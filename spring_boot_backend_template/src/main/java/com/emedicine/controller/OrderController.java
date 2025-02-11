package com.emedicine.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.emedicine.dto.OrderDto;
import com.emedicine.pojos.Orders;
import com.emedicine.service.OrdersService;

@CrossOrigin
@RestController
@RequestMapping("/emedicine/orders")
public class OrderController {

	@Autowired
	private OrdersService ordersService;
	@GetMapping("/{orderId}")
	public ResponseEntity<?> getOrdersDetails(@PathVariable("orderId") Integer orderId) {
	    if (orderId == null || orderId <= 0) {  // Check for null or invalid ID
	        return ResponseEntity.badRequest().body("Invalid order ID."); // Return a 400 Bad Request
	    }

	    Orders order = ordersService.getOrdersDetails(orderId);
	    if (order == null) { // Check if the order exists
	        return ResponseEntity.notFound().build(); // Return 404 Not Found if not found
	    }

	    return ResponseEntity.ok(order); // Return 200 OK if found
	}
	@PostMapping("/placed/{userId}") // Consistent naming: userId
	public ResponseEntity<?> addOrderToCart(@PathVariable("userId") Integer userId) {
		 System.out.println("Received order placement request for userId: " + userId);
	    if (userId == null || userId <= 0) { // Validate userId
	        return ResponseEntity.badRequest().body("Invalid user ID.");
	    }

	    OrderDto placeOrder = ordersService.placeOrder(userId);
	    return ResponseEntity.ok(placeOrder);
	}

    @GetMapping("/orders/{userId}")
    public ResponseEntity<?> getAllUserOrder(@PathVariable Integer userId) {
        List<OrderDto> orders = ordersService.getAllUserOrder(userId);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Orders>> viewAllOrders() {
        List<Orders> orders = ordersService.viewAllOrders();
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @GetMapping("/date/{date}")
    public ResponseEntity<List<Orders>> viewAllOrderByDate(
            @PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date date) {
        List<Orders> orders = ordersService.viewAllOrderByDate(date);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @DeleteMapping("/users/{userId}/{orderId}")
    public ResponseEntity<?> deleteOrders(@PathVariable Integer userId, @PathVariable Integer orderId) {
        if (userId == null || userId <= 0 || orderId == null || orderId <= 0) {
            return ResponseEntity.badRequest().body("Invalid user or order ID.");
        }

        try {
            ordersService.deleteOrders(userId, orderId);
            return ResponseEntity.ok("Order successfully deleted."); // 200 OK with a message

        } catch (Exception e) { // Catch potential exceptions (e.g., order not found)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR) // 500 Internal Server Error
                    .body("Error deleting order: " + e.getMessage());  // Include error message for debugging.  Don't expose raw exceptions in production.
        }
    }

}
