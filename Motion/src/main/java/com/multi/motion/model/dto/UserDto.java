package com.multi.motion.model.dto;

import java.util.Date;

public class UserDto {
	private String userID;
	private String userPW;
	private String userName;
	private String phoneNumber;
	private UserGrade userGrade;
	private Date registeredDate;
	private boolean isResigned;
	
	@Override
	public String toString() {
		return "UserDto [userID=" + userID + ", userPW=" + userPW + ", userName=" + userName + ", phoneNumber="
				+ phoneNumber + ", userGrade=" + userGrade + ", registeredDate=" + registeredDate + ", isResigned="
				+ isResigned + "]";
	}

	public UserDto() {
		super();
	}

	public UserDto(String userID, String userPW, String userName, String phoneNumber, UserGrade userGrade,
			Date registeredDate, boolean isResigned) {
		super();
		this.userID = userID;
		this.userPW = userPW;
		this.userName = userName;
		this.phoneNumber = phoneNumber;
		this.userGrade = userGrade;
		this.registeredDate = registeredDate;
		this.isResigned = isResigned;
	}

	public String getUserID() {
		return userID;
	}

	public String getUserPW() {
		return userPW;
	}

	public String getUserName() {
		return userName;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public UserGrade getUserGrade() {
		return userGrade;
	}

	public Date getRegisteredDate() {
		return registeredDate;
	}

	public boolean isResigned() {
		return isResigned;
	}

	public void setUserID(String userID) {
		this.userID = userID;
	}

	public void setUserPW(String userPW) {
		this.userPW = userPW;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public void setUserGrade(UserGrade userGrade) {
		this.userGrade = userGrade;
	}

	public void setRegisteredDate(Date registeredDate) {
		this.registeredDate = registeredDate;
	}

	public void setResigned(boolean isResigned) {
		this.isResigned = isResigned;
	}
}
