package com.emedicine.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.emedicine.custom_exceptions.MedicineException;
import com.emedicine.dto.MedicineDto;
import com.emedicine.pojos.Medicine;

public interface MedicineService {
//	public Medicine addMedicine(Medicine medicine, MultipartFile[] images) throws IOException ;
public Medicine updateMedicine(Integer productId,MedicineDto medicine)throws MedicineException;
public Medicine getSingleMedicine(Integer productId) throws MedicineException;
public void removeMeddicine(Integer productId) throws MedicineException;
public List<Medicine> getProductByName(String name)throws MedicineException;

public List<Medicine> getAllProduct(String keyword, String sortDirection, String sortBy)throws MedicineException;

public List<Medicine> getProductByCategory(String catagory) throws MedicineException;
Medicine addMedicine(Medicine medicine, List<MultipartFile> images) throws IOException;
public List<String> getImageUrls(Integer productId);
List<Medicine> getAllMedicines() ;
}
