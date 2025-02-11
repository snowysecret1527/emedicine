package com.emedicine.custom_exceptions;

public class CartException extends RuntimeException{
String message;

public CartException(String message) {
	super();
	this.message = message;
}

}
