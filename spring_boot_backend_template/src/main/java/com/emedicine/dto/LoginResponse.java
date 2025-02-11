package com.emedicine.dto;


public class LoginResponse {
    private String token;

    private long expiresIn;
	private Integer userId;

    public String getToken() {
        return token;
    }

public long getExpiresIn() {
return expiresIn;
}

public void setExpiresIn(long expiresIn) {
this.expiresIn = expiresIn;
}

public void setToken(String token) {
this.token = token;
}

public void setUserId(Integer userId) {
	// TODO Auto-generated method stub
	
	this.userId=userId;
	
}

public Integer getUserId() {
	return userId;
}

   
}
