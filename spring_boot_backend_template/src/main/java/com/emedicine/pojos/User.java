package com.emedicine.pojos;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Table(name = "users")
@Entity
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false)
    private Integer id;

    @Column(nullable = false)
    private String firstName;
    
    private String lastName;

    @Column(unique = true, length = 100, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @CreationTimestamp
    @Column(updatable = false, name = "created_at")
    private Date createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Date updatedAt;
    private String phoneNumber;
   
  @ManyToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
@JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
  private Set<Role> userRoles = new HashSet<Role>();
   
//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    private Set<Role> userRoles;
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
    return userRoles.stream().map(role -> new SimpleGrantedAuthority(role.getRoleName().name())).collect(Collectors.toList());
    }

    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

public Integer getId() {
return id;
}

public void setId(Integer id) {
this.id = id;
}



public String getEmail() {
return email;
}

public void setEmail(String email) {
this.email = email;
}

public Date getCreatedAt() {
return createdAt;
}

public void setCreatedAt(Date createdAt) {
this.createdAt = createdAt;
}

public Date getUpdatedAt() {
return updatedAt;
}

public void setUpdatedAt(Date updatedAt) {
this.updatedAt = updatedAt;
}

public void setPassword(String password) {
this.password = password;
}

public Set<Role> getUserRoles() {
return userRoles;
}

public void setUserRoles(Set<Role> userRoles) {
this.userRoles = userRoles;
}

@Column(name = "UserAccountStatus")
@Enumerated(EnumType.STRING)
private UserAccountStatus userAccountStatus;


@JsonManagedReference
@OneToOne(cascade = CascadeType.ALL, mappedBy = "user")
private Cart cart;



@JsonIgnore
@OneToMany(mappedBy = "user")
private List<Orders> orders = new ArrayList<>();;

//@JsonIgnore
//@OneToMany(mappedBy = "user")
//private List<Review> reviews = new ArrayList<>();;

@OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
private List<Address> address = new ArrayList<>();

@JsonIgnore
@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
private List<Payment> payments = new ArrayList<>();

public List<Payment> getPayments() {
	return payments;
}

public void setPayments(List<Payment> payments) {
	this.payments = payments;
}

public void updatePassword(String newPassword, PasswordEncoder passwordEncoder) {
    // Hash the new password before setting it
    String hashedPassword = passwordEncoder.encode(newPassword);
    this.setPassword(hashedPassword);
}

public String getFirstName() {
	return firstName;
}

public void setFirstName(String firstName) {
	this.firstName = firstName;
}

public String getLastName() {
	return lastName;
}

public void setLastName(String lastName) {
	this.lastName = lastName;
}

public String getPhoneNumber() {
	return phoneNumber;
}

public void setPhoneNumber(String phoneNumber) {
	this.phoneNumber = phoneNumber;
}

public UserAccountStatus getUserAccountStatus() {
	return userAccountStatus;
}

public void setUserAccountStatus(UserAccountStatus userAccountStatus) {
	this.userAccountStatus = userAccountStatus;
}

public Cart getCart() {
	return cart;
}

public void setCart(Cart cart) {
	this.cart = cart;
}

public List<Orders> getOrders() {
	return orders;
}

public void setOrders(List<Orders> orders) {
	this.orders = orders;
}

public List<Address> getAddress() {
	return address;
}

public void setAddress(List<Address> address) {
	this.address = address;
}
   
   
}