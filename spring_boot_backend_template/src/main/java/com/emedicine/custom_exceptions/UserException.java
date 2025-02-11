package com.emedicine.custom_exceptions;

public class UserException extends RuntimeException{
private String message;

public UserException(String message) {
	super();
	this.message = message;
}

}
