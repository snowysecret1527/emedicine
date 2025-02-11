package com.emedicine.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.emedicine.custom_exceptions.OrdersException;
import com.emedicine.custom_exceptions.UserException;
import com.emedicine.dto.OrderDto;
import com.emedicine.pojos.Cart;
import com.emedicine.pojos.CartItem;
import com.emedicine.pojos.OrderItem;
import com.emedicine.pojos.OrderStatus;
import com.emedicine.pojos.Orders;
import com.emedicine.pojos.User;
import com.emedicine.repositories.CartItemRepository;
import com.emedicine.repositories.CartRepository;
import com.emedicine.repositories.OrderRepository;
import com.emedicine.repositories.UserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class OrdersServiceImpl implements OrdersService{

//	@Override
//	public OrderDto placeOrder(Integer orderId) throws OrdersException {
//		// TODO Auto-generated method stub
//		return null;
//	}

	@Autowired
	private OrderRepository orderRepository;
	
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private ModelMapper modelMapper;
	@Autowired
	private EmailService emailService;
	@Override
	public Orders updateOrders(Integer ordersid, OrderDto orderDTo) throws OrdersException {
		
		return null;
	}
	@Autowired
	private  CartItemRepository cartItemRepository;
@Autowired
    private  CartRepository cartRepository;

    @Override
    public OrderDto placeOrder(Integer userId) throws OrdersException {
        User existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new UserException("User Not Found In Database"));

        Cart usercart = existingUser.getCart();
        if(usercart.getTotalAmount()==0){
            throw new OrdersException("Add item To the cart first.......");
        }
        Integer cartId = usercart.getCartId();

        Orders newOrder = new Orders();

        newOrder.setOrderDate(LocalDateTime.now());
        newOrder.setStatus(OrderStatus.PENDING);

        existingUser.getOrders().add(newOrder);
        newOrder.setUser(existingUser);
        userRepository.save(existingUser);
        orderRepository.save(newOrder);

        List<OrderItem> orderItems = new ArrayList<>();
        for (CartItem cartItem : usercart.getCartItems()) {
            if (cartItem.getCart().getCartId().equals(cartId)) {
                OrderItem orderItem = new OrderItem();
                orderItem.setQuantity(cartItem.getQuantity());
                orderItem.setMedicine(cartItem.getMedicine());
                orderItem.setOrderId(newOrder.getOrderId());
                orderItems.add(orderItem);
            }
        }


        newOrder.setOrderItem(orderItems);
        newOrder.setTotalAmount(usercart.getTotalAmount());
        orderRepository.save(newOrder);


        usercart.setTotalAmount(usercart.getTotalAmount() - newOrder.getTotalAmount());
        cartItemRepository.removeAllProductFromCart(cartId);
        cartRepository.save(usercart);
        // Prepare the email content
        String subject = "Order Confirmation - Order #" + newOrder.getOrderId();
        String body = "Dear " + existingUser.getFirstName() + ",\n\n" +
                      "Thank you for your order. Your order ID is " + newOrder.getOrderId() + ".\n" +
                      "Total Amount: $" + newOrder.getTotalAmount() + "\n" +
                      "Order Date: " + newOrder.getOrderDate() + "\n\n" +
                      "We will notify you once your order is shipped.\n\n" +
                      "Thank you for shopping with us!\n\nBest regards,\nYour Company Name";

        // Send the email
        emailService.sendOrderConfirmationEmail(existingUser.getEmail(), subject, body);


        OrderDto orderdata=new OrderDto();
        orderdata.setOrderId(newOrder.getOrderId());
        orderdata.setTotalAmount(newOrder.getTotalAmount());
        orderdata.setStatus("Pending");
        orderdata.setPaymentStatus("Pending");
        orderdata.setOrderDate(LocalDateTime.now().toString());
        return orderdata;

    }
	@Override
	public Orders getOrdersDetails(Integer orderid) throws OrdersException {
		Orders orders=orderRepository.findById(orderid).orElseThrow(()-> new OrdersException("order not found"));
		return orders;
	}

	@Override
	public List<OrderDto> getAllUserOrder(Integer userId) throws OrdersException {
		List<Orders> orders=orderRepository.getAllOrdersByUserId(userId);
		if(orders.isEmpty())
			throw new OrdersException("No orders found ");
		return orders.stream()
                .map(order -> modelMapper.map(order, OrderDto.class))
                .collect(Collectors.toList());
	}

	@Override
	public List<Orders> viewAllOrders() throws OrdersException {
		List<Orders> orders=orderRepository.findAll();
		if(orders.isEmpty())
			throw new OrdersException("No orders found ");
		return orders;
	}

	@Override
	public List<Orders> viewAllOrderByDate(Date date) throws OrdersException {
		List<Orders> orders=orderRepository.findByOrderDateGreaterThanEqual(date);
		if(orders.isEmpty())
			throw new OrdersException("No orders found for the given date");
		return orders;
	}

	@Override
	public void deleteOrders(Integer userId, Integer Orderid) throws OrdersException {
		
		User existingUSer=userRepository.findById(userId).orElseThrow(()-> new UserException("User not found"));
		Orders exitingOrders=orderRepository.findById(Orderid).orElseThrow(()-> new UserException("order not found"));
		orderRepository.delete(exitingOrders);
	}

}
