package com.emedicine.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.emedicine.pojos.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long>{

}
