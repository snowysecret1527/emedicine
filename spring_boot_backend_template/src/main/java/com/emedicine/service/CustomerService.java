package com.emedicine.service;

import java.util.List;

import com.emedicine.custom_exceptions.UserException;
import com.emedicine.dto.AdminDto;

import com.emedicine.dto.RegisterUserDto;
import com.emedicine.pojos.User;

public interface CustomerService {
	public User getUserByEmailId(String emailId)throws UserException;

	public User addUser(RegisterUserDto customer)  throws UserException;

	public User addUserAdmin(AdminDto admin )  throws UserException;

	public User changePassword(Integer userId, RegisterUserDto customer)  throws UserException;

	public String deactivateUser(Integer userId) throws UserException;

	public User getUserDetails(Integer userId)throws UserException;

	public List<User> getAllUserDetails() throws UserException;
}
