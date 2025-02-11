package com.emedicine.service;

import java.util.List;

import com.emedicine.custom_exceptions.AddressException;
import com.emedicine.pojos.Address;

public interface AddressService {

	public Address addAddressToUser(Integer userId,Address address) throws AddressException;
	public Address updateAddress(Integer userId,Address address) throws AddressException;
	public void removeAddress(Integer addressId) throws AddressException;
	public List<Address> getAllUserAddress(Integer userId) throws AddressException;
}
