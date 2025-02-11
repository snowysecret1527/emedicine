package com.emedicine.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.emedicine.custom_exceptions.AddressException;
import com.emedicine.pojos.Address;
import com.emedicine.pojos.User;
import com.emedicine.repositories.*;
import com.emedicine.repositories.UserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class AddressServiceImpl implements AddressService{
	
@Autowired
private AddressRepository addrepo;

@Autowired
private UserRepository userRepo;

@Override
public Address addAddressToUser(Integer userId, Address address) throws AddressException {
	User existing=userRepo.findById(userId).orElseThrow();
	Address saveAddress=addrepo.save(address);
	saveAddress.setUser(existing);
	userRepo.save(existing);
	return saveAddress;
}

@Override
public Address updateAddress(Integer userId, Address address) throws AddressException {
	// TODO Auto-generated method stub
	Address existingAddress = addrepo.findById(userId)
            .orElseThrow(() -> new AddressException("Address not found"));


    existingAddress.setFlatNo(address.getFlatNo());
    existingAddress.setZipCode(address.getZipCode());
    existingAddress.setStreet(address.getStreet());
    existingAddress.setCity(address.getCity());
    existingAddress.setState(address.getState());
    // Save the updated address in the repository
    return addrepo.save(existingAddress);

	
}

@Override
public void removeAddress(Integer addressId) throws AddressException {
	// TODO Auto-generated method stub
	Address existingAddress = addrepo.findById(addressId)
            .orElseThrow(() -> new AddressException("Address not found"));
	addrepo.delete(existingAddress);
	
}

@Override
public List<Address> getAllUserAddress(Integer userId) throws AddressException {
	// TODO Auto-generated method stub
	List<Address> user=addrepo.findByUserId(userId);
	if(user.isEmpty())
	{
		System.out.println("Empty");
		throw new AddressException("Address not found");
	}
	return user;
}


}
