package com.emedicine;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.emedicine.pojos.Role;
import com.emedicine.pojos.RoleEnum;
import com.emedicine.repositories.RoleRepository;

@SpringBootApplication
public class DemoApplication  implements CommandLineRunner{
	@Autowired
	private RoleRepository roleRepo;
	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}
	
	@Override
	public void run(String... args) throws Exception {
	Role role1 = new Role();
	role1.setRoleName(RoleEnum.ADMIN);
	Role role2 = new Role();
	role2.setRoleName(RoleEnum.USER);
	Set<Role> roles = new HashSet<Role>();
	roles.add(role1);
	roles.add(role2);
	for(Role role : roles) {
	Optional<Role> existingUser = roleRepo.findByRoleName(role.getRoleName());

	            if (existingUser.isEmpty()) {
	                // If the user doesn't exist, insert them
	                roleRepo.save(role);
	            }
	}
	}
	
	@Bean // equivalent to <bean id ..../> in xml file
	public ModelMapper modelMapper() {
		ModelMapper modelMapper = new ModelMapper();
		modelMapper.getConfiguration()
		.setMatchingStrategy(MatchingStrategies.STRICT) 
				.setPropertyCondition(Conditions.isNotNull());
		return modelMapper;
	}

	
	
	
	
	
	
	
}
