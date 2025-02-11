package com.emedicine.repositories;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.emedicine.pojos.Medicine;

public interface MedicineRepository extends JpaRepository<Medicine, Integer>{

	@Query("SELECT med FROM Medicine med WHERE med.name like %:medicine%")
public	List<Medicine> findByName(@Param("medicine") String name);

	@Query("SELECT med FROM Medicine med WHERE med.category like %:cat%")
public	List<Medicine> getProductCategoryName(@Param("cat") String name);
	
	public List<Medicine> findAllByNameContainingIgnoreCase(String keyword,Sort sort);
	
}
