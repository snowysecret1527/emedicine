package com.emedicine.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class OrderDto {
	private Integer orderId;
private String status;
	
	private String orderDate;
	
	private String paymentStatus;
	
	private double totalAmount;
	  private List<OrderItemDto> orderItem;
	    private UserDto user;
}
