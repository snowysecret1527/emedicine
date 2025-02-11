package com.emedicine.dto;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderItemDto {

	private int productId;
	private int quantity;
	private BigDecimal price;
}
