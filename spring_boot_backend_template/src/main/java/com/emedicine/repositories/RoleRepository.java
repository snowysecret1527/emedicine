package com.emedicine.repositories;

import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.emedicine.pojos.Role;
import com.emedicine.pojos.RoleEnum;



public interface RoleRepository extends JpaRepository<Role,Long> {
	  Optional<Role> findByRoleName(RoleEnum roleName);
	    
	    // Use List<Role> to avoid issues with null or incomplete collections
	    Set<Role> findByRoleNameIn(Set<RoleEnum> roles);
}