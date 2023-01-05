package com.multi.motion.biz;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.multi.motion.model.dao.UserDao;
import com.multi.motion.model.dto.DigitCodeType;
import com.multi.motion.model.dto.SmsMessage;
import com.multi.motion.model.dto.UserDto;

@Service
public class UserBizImpl implements UserBiz {

	@Autowired
	private UserDao dao;
	
	@Override
	public UserDto selectOneFromId(String userID) {
		return dao.selectOneFromId(userID);
	}

	@Override
	public UserDto selectOneFromPhoneNumber(String phoneNumber) {
		return dao.selectOneFromPhoneNumber(phoneNumber);
	}
	
	@Override
	public int insert(UserDto dto) {
		return dao.insert(dto);
	}

	@Override
	public int updatePw(UserDto dto) {
		return dao.updatePw(dto);
	}
	
	@Override
	public int updateName(UserDto dto) {
		return dao.updateName(dto);
	}
	
	@Override
	public boolean canUseId(UserDto dto) {
		return dao.canUseId(dto);
	}
	
	@Override
	public boolean canUsePhoneNumber(UserDto dto) {
		return dao.canUsePhoneNumber(dto);
	}
	
	@Override
	public UserDto encodePw(UserDto dto) {
		return dao.encodePw(dto);
	}

	@Override
	public boolean checkPw(UserDto dto) {
		return dao.checkPw(dto);
	}
	
	@Override
	public boolean checkDigitCode(UserDto dto, String digitCode, DigitCodeType type, HttpSession session) {
		return dao.checkDigitCode(dto, digitCode, type, session);
	}

	@Override
	public boolean sendSms(SmsMessage ...messages) {
		return dao.sendSms(messages);
	}
	
	@Override
	public String makeDigitCode() {
		return dao.makeDigitCode();
	}
}
