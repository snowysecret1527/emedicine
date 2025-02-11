package com.emedicine.custom_exceptions;

public class AddressException extends RuntimeException {
String message;

public AddressException(String message) {
	super();
	this.message = message;
}

}
