package com.emedicine.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.emedicine.custom_exceptions.MedicineException;
import com.emedicine.dto.MedicineDto;
import com.emedicine.pojos.Medicine;
import com.emedicine.repositories.MedicineRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class MedicineServiceImpl implements MedicineService{

	@Autowired
	private MedicineRepository medicineRepository;
	@Autowired
	private ModelMapper mapper;
	 private final String UPLOAD_DIRECTORY = System.getProperty("user.dir")+"src/main/resources/static/images/"; // **CONFIGURE THIS!**
	
	@Override
	public Medicine addMedicine(Medicine medicine, List<MultipartFile> images) throws IOException  {
//		if(medic==null)
//			throw new MedicineException("Medicine cannot be null");
//		Medicine medicine=mapper.map(medic, Medicine.class);
		 List<String> imageUrls = new ArrayList<>();

	        if (images != null && images.size() > 0) {
	            for (MultipartFile image : images) {
	                if (!image.isEmpty()) {
	                   // String uniqueFileName = UUID.randomUUID().toString() + "_" + image.getOriginalFilename();
	                	String uniqueFileName =  image.getOriginalFilename();
	                    Path filePath = Paths.get(UPLOAD_DIRECTORY, uniqueFileName);

	                    try {
							Files.createDirectories(Paths.get(UPLOAD_DIRECTORY));
						} catch (IOException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}

	                    try {
							Files.copy(image.getInputStream(), filePath);
						} catch (IOException e) {
							
							e.printStackTrace();
						}

	                    imageUrls.add("/images/" + uniqueFileName); // Store relative URL
	                }
	            }
	            medicine.setImageUrlsFromList(imageUrls);
	        }
		return medicineRepository.save(medicine);
	}

	@Override
	public Medicine updateMedicine(Integer productId, MedicineDto medicine) throws MedicineException {
		Optional<Medicine> medicines =medicineRepository.findById(productId);
		if(medicines.isEmpty())
			throw new MedicineException("Product with Id"+productId+"Not found");
		
		Medicine exitingMedicine=medicines.get();
		exitingMedicine.setName(medicine.getName());
		exitingMedicine.setCategory(medicine.getCategory());
		exitingMedicine.setDescription(medicine.getDescription());
		exitingMedicine.setPrice(medicine.getPrice());
		medicineRepository.save(exitingMedicine);
		return exitingMedicine;
	}

	@Override
	public Medicine getSingleMedicine(Integer productId) throws MedicineException {
		Medicine medicine=medicineRepository.findById(productId).orElseThrow(()->new MedicineException("Not found"));
		return medicine;
	}

	@Override
	public void removeMeddicine(Integer productId) throws MedicineException {
		Medicine med=medicineRepository.findById(productId).orElseThrow(()->new MedicineException("Not found"));
		medicineRepository.delete(med);
		
	}

	@Override
	public List<Medicine> getProductByName(String name) throws MedicineException {
		List<Medicine> existsMedicineByName=medicineRepository.findByName(name);
		if(existsMedicineByName.isEmpty())
			throw new MedicineException("Not Found:");
		return existsMedicineByName;
	}

	@Override
	public List<Medicine> getAllProduct(String keyword, String sortDirection, String sortBy) throws MedicineException {
		Sort sort = Sort.by(sortDirection.equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC,sortBy);

        List<Medicine> products;

        if (keyword != null) {

            products = medicineRepository.findAllByNameContainingIgnoreCase(keyword, sort);
        } else {
            products = medicineRepository.findAll(sort);
        }
        if (products.isEmpty()) {
            throw new MedicineException("Product List Empty");
        }

        return products;
		
	}

    public List<Medicine> getAllMedicines() {
        return medicineRepository.findAll();
    }

    public List<String> getImageUrls(Integer productId) { // New method to get image URLs
        Medicine medicine = medicineRepository.findById(productId).orElse(null);
        if (medicine != null) {
            return medicine.getImageUrlsList(); // Or however you access the image URLs
        }
        return null; // Or an empty list
    }
	
	
	
	@Override
	public List<Medicine> getProductByCategory(String catagory) throws MedicineException {
		List<Medicine> getMedicineByCategory=medicineRepository.getProductCategoryName(catagory);
		if(getMedicineByCategory.isEmpty())
			throw new MedicineException("Not Found:");
		return getMedicineByCategory;
	}

}
