package com.emedicine.service;

import com.emedicine.custom_exceptions.PaymentException;
import com.emedicine.pojos.Payment;

public interface PaymentService {
Payment makePayment(Integer rderId,Integer userId) throws PaymentException;
}
