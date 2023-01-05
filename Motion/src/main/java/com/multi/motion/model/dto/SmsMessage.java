package com.multi.motion.model.dto;

public class SmsMessage {
	private String to;
	private String content;
	
	public SmsMessage(String to, String content) {
		super();
		this.to = to;
		this.content = content;
	}

	public String getTo() {
		return to;
	}

	public String getContent() {
		return content;
	}

	public void setTo(String to) {
		this.to = to;
	}

	public void setContent(String content) {
		this.content = content;
	}
}
