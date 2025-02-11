package com.emedicine.pojos;

public enum RoleEnum {
	USER,
    ADMIN;

	public String toUpperCase() {
		
		return this.name();
	}

//    public static RoleEnum fromString(String role) {
//        switch (role.toUpperCase()) {
//            case "ROLE_USER":
//                return USER;
//            case "ROLE_ADMIN":
//                return ADMIN;
//            default:
//                throw new IllegalArgumentException("Invalid role: " + role);
//        }
//    }
}
