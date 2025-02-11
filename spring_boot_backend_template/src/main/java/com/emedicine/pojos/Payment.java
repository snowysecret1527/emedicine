package com.emedicine.pojos;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="payement")
@Getter
@Setter
public class Payment {
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "payment_id")
	    private Long paymentId;

	   
	    @Column(name = "payment_date")
	    private LocalDateTime paymentDate;

	    @Column(name = "payment_amount")
	    private double paymentAmount;

	    @Enumerated(EnumType.STRING)
	    private  PaymentMethod paymentMethod;
	   
	    @Enumerated(EnumType.STRING)
	    private PaymentStatus paymentStatus;

	    @JsonIgnore
	    @OneToOne
	    @JoinColumn(name = "order_id")
	    private Orders order;
	   
	   

	    @ManyToOne(fetch = FetchType.LAZY)
	    @JoinColumn(name = "user_id", nullable = false)
	    private User user;

}
