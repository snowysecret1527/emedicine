package com.emedicine.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.emedicine.custom_exceptions.UserException;
import com.emedicine.dto.UserSignInDetail;
import com.emedicine.service.CustomerServiceImpl;

@RestController
@CrossOrigin
@RequestMapping("/emedicine")
public class LoginController {

@Autowired
private CustomerServiceImpl userService;

@GetMapping("/signIn")
public ResponseEntity<UserSignInDetail> getLoggedInCustomerDetailsHandler(Authentication auth) {
try {var customer = userService.getUserByEmailId(auth.getName());
UserSignInDetail signinSuceesData = new UserSignInDetail();
signinSuceesData.setId(customer.getId());
signinSuceesData.setFirstName(customer.getFirstName());
signinSuceesData.setLastName(customer.getLastName());
signinSuceesData.setSigninStatus("Success");

return new ResponseEntity<>(signinSuceesData, HttpStatus.OK);}
catch(UserException ex ){
throw new UserException(" Invalid Password");
}

}
}
