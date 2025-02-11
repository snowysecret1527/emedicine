package com.emedicine.custom_exceptions;

public class PaymentException extends RuntimeException {
	String mess;

	public PaymentException(String mess) {
		super();
		this.mess = mess;
	}
	

}
