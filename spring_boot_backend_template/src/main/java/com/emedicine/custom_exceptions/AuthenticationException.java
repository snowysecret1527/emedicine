package com.emedicine.custom_exceptions;

public class AuthenticationException extends RuntimeException{
//String message;

public AuthenticationException(String message) {
	super(message);
	//this.message = message;
}

}
