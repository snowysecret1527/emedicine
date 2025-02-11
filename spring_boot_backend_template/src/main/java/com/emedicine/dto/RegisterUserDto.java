package com.emedicine.dto;

import java.util.HashSet;
import java.util.Set;

import com.emedicine.pojos.RoleEnum;

import lombok.Getter;
import lombok.Setter;

@Getter 
@Setter
public class RegisterUserDto {

	private String email;
	private String password;
	private String firstName;
	private String lastName;
	private String phoneNumber;
private Set<RoleEnum> userRoles;
	//private RoleEnum userRoles;
}
