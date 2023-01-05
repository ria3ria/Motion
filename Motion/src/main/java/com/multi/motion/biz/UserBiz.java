package com.multi.motion.biz;

import javax.servlet.http.HttpSession;

import com.multi.motion.model.dto.DigitCodeType;
import com.multi.motion.model.dto.SmsMessage;
import com.multi.motion.model.dto.UserDto;

public interface UserBiz {
	public UserDto selectOneFromId(String userID);
	public UserDto selectOneFromPhoneNumber(String phoneNumber);
	public int insert(UserDto dto);
	public int updatePw(UserDto dto);
	public int updateName(UserDto dto);
	
	public boolean canUseId(UserDto dto);
	public boolean canUsePhoneNumber(UserDto dto);
	public UserDto encodePw(UserDto dto);
	public boolean checkPw(UserDto dto);
	public boolean checkDigitCode(UserDto dto, String digitCode, DigitCodeType type, HttpSession session);
	
	public boolean sendSms(SmsMessage ...messages);
	public String makeDigitCode();
}
