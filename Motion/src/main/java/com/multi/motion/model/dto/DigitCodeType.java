package com.multi.motion.model.dto;

public enum DigitCodeType {
	REGISTER("회원가입"),
	FINDID("아이디찾기");
	
	private String description;

	private DigitCodeType(String description) {
		this.description = description;
	}

	public String getDescription() {
		return description;
	}
}
