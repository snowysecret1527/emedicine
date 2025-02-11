package com.emedicine.custom_exceptions;

public class MedicineException  extends RuntimeException{
	//String message;

	public MedicineException(String message) {
		super(message);
		//this.message = message;
	}
 

}
