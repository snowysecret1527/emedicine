package com.emedicine.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.emedicine.pojos.Payment;
import com.emedicine.service.PaymentService;

import lombok.RequiredArgsConstructor;

@RestController
	
	@RequestMapping("/emedicine/order-payments")
	public class PaymentController {

	@Autowired
		private PaymentService paymentService;

		@PostMapping("/makePayment")
		public ResponseEntity<Payment> makePayment(@RequestParam Integer orderId, @RequestParam Integer userId
				) {
			Payment payment = paymentService.makePayment(orderId, userId);
			return ResponseEntity.ok(payment);
		}
	}
