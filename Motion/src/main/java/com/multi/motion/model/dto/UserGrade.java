package com.multi.motion.model.dto;

public enum UserGrade {
	PRODUCER("제작자"),
	ARTIST("아티스트"),
	ADMIN("관리자");
	
	private String description;

	private UserGrade(String description) {
		this.description = description;
	}

	public String getDescription() {
		return description;
	}
}
