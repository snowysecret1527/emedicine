package com.emedicine.service;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.emedicine.custom_exceptions.UserException;
import com.emedicine.dto.AdminDto;
import com.emedicine.dto.RegisterUserDto;
import com.emedicine.dto.UserDto;
import com.emedicine.pojos.User;
import com.emedicine.pojos.UserAccountStatus;
import com.emedicine.repositories.UserRepository;

@Service
public class CustomerServiceImpl implements CustomerService{
    private final UserRepository userRepository;
@Autowired
private PasswordEncoder passwordEncoder;
    public CustomerServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> allUsers() {
        List<User> users = new ArrayList<>();

        userRepository.findAll().forEach(users::add);

        return users;
    }
    @Override
    public User getUserByEmailId(String emailId) throws UserException {
    return userRepository.findByEmail(emailId).orElseThrow(() -> new UserException("User not found"));

    }

    @Override
    public User addUser(RegisterUserDto customer) throws UserException {
    if (customer == null)
    throw new UserException("customer Can not be Null");
    Optional<User> findByEmail = userRepository.findByEmail(customer.getEmail());
    if (findByEmail.isPresent()) {
    System.out.println("inside add user method");
    throw new RuntimeException("Email alredy Register");
    }

    User newCustomer = new User();
    newCustomer.setEmail(customer.getEmail());
    newCustomer.setPassword(customer.getPassword());
    newCustomer.setFirstName(customer.getFirstName());
    newCustomer.setLastName(customer.getLastName());
    newCustomer.setPhoneNumber(customer.getPhoneNumber());
  
   
    newCustomer.setUserAccountStatus(UserAccountStatus.ACTIVE);

    return userRepository.save(newCustomer);
    }

    @Override
    public User addUserAdmin(AdminDto customer) throws UserException {
    if (customer == null)
    throw new UserException("admin Can not be Null");
    Optional<User> findByEmail = userRepository.findByEmail(customer.getEmail());
    if (findByEmail.isPresent()) {
    System.out.println("inside add user method");
    throw new RuntimeException("Email alredy Register");
    }
    User newAdmin = new User();
    newAdmin.setEmail(customer.getEmail());
    newAdmin.setPassword(customer.getPassword());
    newAdmin.setFirstName(customer.getFirstName());
    newAdmin.setLastName(customer.getLastName());
    newAdmin.setPhoneNumber(customer.getPhoneNumber());
    
   
    newAdmin.setUserAccountStatus(UserAccountStatus.ACTIVE);

    return userRepository.save(newAdmin);
    }

//    public User changePassword(Integer userId, UserDto customer) throws UserException {
//    User user = userRepository.findById(userId).orElseThrow(() -> new UserException("User not found"));
//    if (customer.getNewPassword().length() >= 5 && customer.getNewPassword().length() <= 10) {
//    user.updatePassword(customer.getNewPassword(), passwordEncoder);
//    return userRepository.save(user);
//    } else {
//    throw new UserException("provide valid  password");
//    }
//
//    }


    @Override
    public String deactivateUser(Integer userId) throws UserException {
    User existingUser = userRepository.findById(userId).orElseThrow(() -> new UserException("User not found"));
    existingUser.setUserAccountStatus(UserAccountStatus.DEACTIVATE);
    userRepository.save(existingUser);
    return "Account deactivet Succesfully";
    }

    @Override
    public User getUserDetails(Integer userId) throws UserException {
    User existingUser = userRepository.findById(userId).orElseThrow(() -> new UserException("User not found"));
    return existingUser;
    }

    @Override
    public List<User> getAllUserDetails() throws UserException {

    List<User> existingAllUser = userRepository.findAll();
    if (existingAllUser.isEmpty()) {
    new UserException("User list is Empty");
    }
    return (List<User>) userRepository.findAll();
    }

	@Override
	public User changePassword(Integer userId, RegisterUserDto customer) throws UserException {
		// TODO Auto-generated method stub
		return null;
	}
}
