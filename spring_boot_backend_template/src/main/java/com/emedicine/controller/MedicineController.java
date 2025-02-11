package com.emedicine.controller;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.emedicine.dto.MedicineDto;
import com.emedicine.pojos.Medicine;
import com.emedicine.service.MedicineService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@CrossOrigin
@RestController
@RequestMapping("/medicines")
public class MedicineController {

	@Autowired
	private MedicineService medicineService;
	@Autowired
	private ModelMapper modelMapper;
	
	
	
    @GetMapping("/{imageName}")
    public ResponseEntity<Resource> getImage(@PathVariable String imageName) throws IOException {
        Path imagePath = Paths.get("src/main/resources/static/images", imageName);
        Resource imageResource = new UrlResource(imagePath.toUri());

        if (imageResource.exists()) {
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG)  // Adjust this based on the image type
                    .body(imageResource);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
	
	 @PostMapping(value = "/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	    public ResponseEntity<?> addMedicine(
	            @RequestPart("medicine") String medicineJson,
	            @RequestPart(value = "images") List<MultipartFile> images) throws IOException {
try {
	ObjectMapper objectMapper=new ObjectMapper();
	MedicineDto medicineDto=objectMapper.readValue(medicineJson, MedicineDto.class);
	 Medicine medicine = new Medicine();
	BeanUtils.copyProperties(medicineDto, medicine);
	
	Medicine med= medicineService.addMedicine(medicine, images);
	   return new ResponseEntity<>(medicine, HttpStatus.CREATED);
}
catch (JsonProcessingException e) {
    System.out.println("Error parsing medicine JSON: {}"+e.getMessage()+ e);
    return ResponseEntity.badRequest().body("Invalid medicine data.");

} catch (Exception e) {
    System.out.println("Unexpected error occurred: {}" + e.getMessage()+ e);
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred. Please try again later.");
}
	        
	    }
	
	@PutMapping("/update/{productId}")
	public ResponseEntity<Medicine> updateMedicine(@PathVariable Integer productId , @RequestBody MedicineDto updateMedicine)
	{
		Medicine newMedicine=medicineService.updateMedicine(productId,updateMedicine);
		return new ResponseEntity<>(newMedicine,HttpStatus.OK);
	}
	
	@GetMapping("/all")
	public ResponseEntity<List<MedicineDto>> getAllMedicines() {
	    try {
	        List<Medicine> medicines = medicineService.getAllMedicines();

	        List<MedicineDto> medicineDtos = medicines.stream()
	                .map(medicine -> {
	                    MedicineDto dto = modelMapper.map(medicine, MedicineDto.class);

	                    List<String> imageUrls = medicine.getImageUrlsList();
	                    if (imageUrls != null && !imageUrls.isEmpty()) {
	                        // Prepend the full URL for each image
	                        List<String> fullImageUrls = imageUrls.stream()
	                                .map(url -> "http://127.0.0.1:8081" + url)
	                                .toList();
	                        dto.setImageUrls(fullImageUrls.get(0));  // Set the first image URL
	                    } else {
	                        // Set a default placeholder image
	                        dto.setImageUrls("http://127.0.0.1:8081/images/placeholder_image.jpg");
	                    }

	                    System.out.println("Image URL for product " + dto.getProductId() + ": " + dto.getImageUrls());
	                    return dto;
	                })
	                .collect(Collectors.toList());

	        return new ResponseEntity<>(medicineDtos, HttpStatus.OK);

	    } catch (Exception e) {
	        System.err.println("Error getting all medicines: " + e.getMessage());
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	    }
	}


    @GetMapping("/category/{category}")
    public ResponseEntity<List<Medicine>> getProductByCategory(@PathVariable String category) {
        List<Medicine> products = medicineService.getProductByCategory(category);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }
	
	@GetMapping("/{productId}")
	public ResponseEntity<Medicine> getSingleMedicine(@PathVariable Integer productId)
	{
		Medicine newMedicine=medicineService.getSingleMedicine(productId);
		return new ResponseEntity<>(newMedicine,HttpStatus.OK);
	}
	@DeleteMapping("/{productId}")
	public ResponseEntity<String> removeMedicine(@PathVariable Integer productId)
	{
		medicineService.removeMeddicine(productId);
		return new ResponseEntity<>("Medicine Removed successfully",HttpStatus.OK);
	}
	
}
