package com.multi.motion.model.dto;

import com.fasterxml.jackson.annotation.JsonValue;

public enum UserGrade {
	PRODUCER("제작자"),
	ARTIST("아티스트"),
	ADMIN("관리자");
	
	@JsonValue
	private String description;

	private UserGrade(String description) {
		this.description = description;
	}
	
	public String getDescription() {
		return description;
	}
}
