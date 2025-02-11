package com.emedicine.pojos;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@Entity
@Table(name="Medicine")
public class Medicine {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Integer productId;


private String name;

//private String imageUrl;

private String description;

private boolean isAvailable=true;

//private String Manufacturer;

private double price;

private String category;
@JsonIgnore
@OneToMany(mappedBy = "medicine", cascade = CascadeType.ALL)
private List<OrderItem> orderItem= new ArrayList<>();

@Column(length = 500)
private String imageUrls;

public List<String> getImageUrlsList() {
    if (imageUrls == null || imageUrls.isEmpty()) {
        return new ArrayList<>();
    }
    return Arrays.asList(imageUrls.split(",")); // Or handle JSON string if you use that
}

public void setImageUrlsFromList(List<String> urls) {
    if (urls == null || urls.isEmpty()) {
        this.imageUrls = null;
        return;
    }
    this.imageUrls = String.join(",", urls); // Or convert to JSON string if needed
}


}
