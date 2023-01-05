package com.multi.motion.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.multi.motion.biz.UserBiz;
import com.multi.motion.model.dto.DigitCodeType;
import com.multi.motion.model.dto.SmsMessage;
import com.multi.motion.model.dto.UserDto;

@Controller
@RequestMapping("/api")
public class ApiController {
	
	@Autowired
	private UserBiz biz;
	
	@Autowired
	BCryptPasswordEncoder passwordEncoder;
	
	@PostMapping("/user/can-use-id")
	@ResponseBody
	public boolean canUseId(UserDto userDto) {
		return biz.canUseId(userDto);
	}
	
	@PostMapping("/user/can-use-phonenumber")
	@ResponseBody
	public boolean canUsePhoneNumber(UserDto userDto) {
		return biz.canUsePhoneNumber(userDto);
	}
	
	@PostMapping("/user/find-id")
	@ResponseBody
	public String findId(UserDto userDto, String digitCode, HttpSession session) {
		if(biz.checkDigitCode(userDto, digitCode, DigitCodeType.FINDID, session)) {
			return biz.selectOneFromPhoneNumber(userDto.getPhoneNumber()).getUserID();
		}
		else {
			return null;
		}
	}
	
	@PostMapping("/user/change-pw")
	@ResponseBody
	public boolean changePw(UserDto userDto, String digitCode, HttpSession session) {
		if(biz.checkDigitCode(userDto, digitCode, DigitCodeType.FINDID, session)) {
			return (biz.update(userDto) > 0);
		}
		else {
			return false;
		}
	}
	
	@PostMapping("/user/check-digitcode")
	@ResponseBody
	public boolean checkDigitCode(UserDto userDto, String digitCode, DigitCodeType type, HttpSession session) {
		return biz.checkDigitCode(userDto, digitCode, type, session);
	}
	
	@PostMapping("/user/register")
	@ResponseBody
	public boolean userRegister(UserDto userDto, String digitCode, HttpSession session) {
		DigitCodeType type = DigitCodeType.REGISTER;
		if(biz.checkDigitCode(userDto, digitCode, type, session)) {
			if(biz.canUseId(userDto)) {
				biz.encodePw(userDto);
				if(biz.insert(userDto) > 0) {
					session.removeAttribute(type + ":" + userDto.getPhoneNumber());
					return true;
				}
			}
		}
		return false;
	}
	
	@PostMapping("/user/login")
	@ResponseBody
	public boolean userLogin(UserDto userDto, HttpSession session) {
		UserDto res = biz.selectOneFromId(userDto.getUserID());
		if(session.getAttribute("login") == null && res != null && biz.checkPw(userDto)) {
			session.setAttribute("login", res);
			session.setMaxInactiveInterval(60 * 30);
			return true;
		}
		else {
			return false;
		}
	}
	
	@PostMapping("/user/islogin")
	@ResponseBody
	public boolean isLogin(HttpSession session) {
		return session.getAttribute("login") != null;
	}
	
	@PostMapping("/user/send-digitcode")
	@ResponseBody
	public boolean sendDigitCode(String phoneNumber, DigitCodeType type, HttpSession session) {
		String digitCode = biz.makeDigitCode();
		String content = null;
		if(type.equals(DigitCodeType.REGISTER)) {
			content = String.format("[모션 회원가입]\n인증번호 %s", digitCode);
		}
		else if(type.equals(DigitCodeType.FINDID)) {
			content = String.format("[모션 아이디찾기]\n인증번호 %s", digitCode);
		}
		if(content != null) {
			if(sendSms(new SmsMessage(phoneNumber, content))) {
				session.setAttribute(type + ":" + phoneNumber, digitCode);
				session.setMaxInactiveInterval(60 * 3);
				return true;
			}
		}
		return false;
	}
	
	public boolean sendSms(SmsMessage ...messages) {
		return biz.sendSms(messages);
	}
}
