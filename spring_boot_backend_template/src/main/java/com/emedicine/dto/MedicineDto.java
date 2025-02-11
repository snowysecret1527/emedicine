package com.emedicine.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class MedicineDto {

	private Integer productId;


	private String name;

	//private String imageUrl;

	private String description;
	 @JsonProperty("isAvailable")
	private boolean isAvailable;

	//private String Manufacturer;

	private double price;

	private String category;
	
	private String imageUrls;

	
}
