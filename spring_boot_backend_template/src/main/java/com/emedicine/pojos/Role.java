package com.emedicine.pojos;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "roles")
@Getter
@Setter
public class Role {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long Id;

@Enumerated(EnumType.STRING)
@Column(unique = true,length=50)
private RoleEnum roleName;




}
