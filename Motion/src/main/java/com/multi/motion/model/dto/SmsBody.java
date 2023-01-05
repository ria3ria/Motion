package com.multi.motion.model.dto;

public class SmsBody {
	private String type = "SMS";
	private String from;
	private String content = "기본 메시지입니다.";
	private SmsMessage[] messages;
	public SmsBody(String from, SmsMessage[] messages) {
		super();
		this.from = from;
		this.messages = messages;
	}
	public String getType() {
		return type;
	}
	public String getFrom() {
		return from;
	}
	public String getContent() {
		return content;
	}
	public SmsMessage[] getMessages() {
		return messages;
	}
	public void setType(String type) {
		this.type = type;
	}
	public void setFrom(String from) {
		this.from = from;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public void setMessages(SmsMessage[] messages) {
		this.messages = messages;
	}
}
