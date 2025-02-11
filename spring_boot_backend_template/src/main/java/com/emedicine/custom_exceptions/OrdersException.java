package com.emedicine.custom_exceptions;

public class OrdersException extends RuntimeException{
	//String message;

	public OrdersException(String message) {
		super(message);
		//this.message = message;
	}
 
}
