package com.emedicine.dto;

import com.emedicine.pojos.RoleEnum;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthResponse {

	private String firstName;
	private String lastName;
	private String email;

	private double regAmount;
	private RoleEnum role;
}
