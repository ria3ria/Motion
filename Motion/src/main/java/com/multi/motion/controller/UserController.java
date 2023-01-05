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
@RequestMapping("/api/user")
public class UserController {
	
	@Autowired
	private UserBiz biz;
	
	@Autowired
	BCryptPasswordEncoder passwordEncoder;
	
	@PostMapping("/can-use-id")
	@ResponseBody
	public boolean canUseId(UserDto userDto) {
		return biz.canUseId(userDto);
	}
	
	@PostMapping("/can-use-phonenumber")
	@ResponseBody
	public boolean canUsePhoneNumber(UserDto userDto) {
		return biz.canUsePhoneNumber(userDto);
	}
	
	@PostMapping("/find-id")
	@ResponseBody
	public String findId(UserDto userDto, String digitCode, HttpSession session) {
		if(biz.checkDigitCode(userDto, digitCode, DigitCodeType.FINDID, session)) {
			return biz.selectOneFromPhoneNumber(userDto.getPhoneNumber()).getUserID();
		}
		else {
			return null;
		}
	}
	
	@PostMapping("/change-pw")
	@ResponseBody
	public boolean changePw(UserDto userDto, String digitCode, HttpSession session) {
		if(biz.checkDigitCode(userDto, digitCode, DigitCodeType.FINDID, session)) {
			return (biz.updatePw(userDto) > 0);
		}
		else {
			return false;
		}
	}
	
	@PostMapping("/change-name")
	@ResponseBody
	public boolean changeName(UserDto userDto, HttpSession session) {
		if(isLogin(session)) {
			if(biz.updateName(userDto) > 0) {
				UserDto dto = (UserDto) session.getAttribute("login");
				dto.setUserName(userDto.getUserName());
				session.setAttribute("login", dto);
				return true;
			}
			else {
				return false;
			}
		}
		else {
			return false;
		}
	}
	
	@PostMapping("/check-digitcode")
	@ResponseBody
	public boolean checkDigitCode(UserDto userDto, String digitCode, DigitCodeType type, HttpSession session) {
		return biz.checkDigitCode(userDto, digitCode, type, session);
	}
	
	@PostMapping("/register")
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
	
	@PostMapping("/login")
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
	
	@PostMapping("/is-login")
	@ResponseBody
	public boolean isLogin(HttpSession session) {
		return session.getAttribute("login") != null;
	}
	
	@PostMapping("/get-info")
	@ResponseBody
	public UserDto getInfo(HttpSession session) {
		if(isLogin(session)) {
			return (UserDto) session.getAttribute("login");
		}
		else {
			return null;
		}
	}
	
	@PostMapping("/send-digitcode")
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
			if(biz.sendSms(new SmsMessage(phoneNumber, content))) {
				session.setAttribute(type + ":" + phoneNumber, digitCode);
				session.setMaxInactiveInterval(60 * 3);
				return true;
			}
		}
		return false;
	}
}
