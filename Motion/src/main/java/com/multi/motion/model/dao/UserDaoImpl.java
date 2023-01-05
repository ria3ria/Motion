package com.multi.motion.model.dao;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Map;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import javax.servlet.http.HttpSession;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;

import com.google.gson.Gson;
import com.multi.motion.model.dto.DigitCodeType;
import com.multi.motion.model.dto.SmsBody;
import com.multi.motion.model.dto.SmsMessage;
import com.multi.motion.model.dto.UserDto;

@Repository
public class UserDaoImpl implements UserDao {

	@Autowired
	private UserMapper userMapper;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	@Override
	public UserDto selectOneFromId(String userID) {
		return userMapper.selectOneFromId(userID);
	}
	
	@Override
	public UserDto selectOneFromPhoneNumber(String phoneNumber) {
		return userMapper.selectOneFromPhoneNumber(phoneNumber);
	}
	
	@Override
	public int insert(UserDto dto) {
		return userMapper.insert(dto);
	}

	@Override
	public int updatePw(UserDto dto) {
		if(dto.getUserPW() != null && !dto.getUserPW().isBlank()) {
			String encodedPasasword = passwordEncoder.encode(dto.getUserPW());
			dto.setUserPW(encodedPasasword);
		}
		return userMapper.updatePw(dto);
	}
	
	@Override
	public int updateName(UserDto dto) {
		return userMapper.updateName(dto);
	}
	
	@Override
	public boolean canUseId(UserDto dto) {
		if(userMapper.selectOneFromId(dto.getUserID()) == null) {
			return true;
		}
		return false;
	}
	
	@Override
	public boolean canUsePhoneNumber(UserDto dto) {
		if(userMapper.selectOneFromPhoneNumber(dto.getPhoneNumber()) == null) {
			return true;
		}
		return false;
	}
	
	@Override
	public UserDto encodePw(UserDto dto) {
		String encodedPasasword = passwordEncoder.encode(dto.getUserPW());
		dto.setUserPW(encodedPasasword);
		return dto;
	}
	
	@Override
	public boolean checkPw(UserDto dto) {
		return passwordEncoder.matches(dto.getUserPW(), userMapper.selectOneFromId(dto.getUserID()).getUserPW());
	}
	
	@Override
	public boolean checkDigitCode(UserDto dto, String digitCode, DigitCodeType type, HttpSession session) {
		if(session.getAttribute(type + ":" + dto.getPhoneNumber()) != null) {
			return session.getAttribute(type + ":" + dto.getPhoneNumber()).equals(digitCode);
		}
		return false;
	}

	@Value("${ncp.sms-from}")
	private String from;
	@Value("${ncp.sms-apiURL}")
	private String apiURL;
	@Value("${ncp.sms-serviceId}")
	private String serviceId;
	@Value("${ncp.sms-accessKey}")
	private String accessKey;
	@Value("${ncp.sms-secretKey}")
	private String secretKey;
	
	@Override
	public boolean sendSms(SmsMessage ...messages) {
		String apiURL = this.apiURL.replace("{serviceId}", serviceId);
		String timestamp = String.valueOf(System.currentTimeMillis());
		String message = "POST "+apiURL.split(".com")[1]+"\n"+timestamp+"\n"+accessKey;
		try {
			URL url = new URL(apiURL);
			
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("POST");
			conn.setUseCaches(false);
			conn.setDoOutput(true);
			conn.setDoInput(true);
			conn.setRequestProperty("Content-Type", "application/json; charset=utf-8");
			conn.setRequestProperty("x-ncp-apigw-timestamp", timestamp);
			conn.setRequestProperty("x-ncp-iam-access-key", accessKey);
			conn.setRequestProperty("x-ncp-apigw-signature-v2", makeSignature(message));
			OutputStream outputStream = conn.getOutputStream();
			
			String json = makeSmsJson(messages);
			
			outputStream.write(json.getBytes());
			outputStream.flush();
			BufferedReader br = null;
			int responseCode = conn.getResponseCode();
			if(responseCode == 202) {
				br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			}
			else {
				System.out.println("sendSms error " + responseCode);
			}
			String inputLine;
			
			if(br != null) {
				StringBuffer response = new StringBuffer();
				while((inputLine = br.readLine()) != null) {
					response.append(inputLine);
				}
				br.close();
				if(new Gson().fromJson(response.toString(), Map.class).get("statusCode").equals("202")) {
					return true;
				}
			}
		} catch (IOException e) {
			System.out.println(e.getMessage());
		}
		return false;
	}
	
	public String makeSignature(String message) {
		String encodeBase64String = null;
		try {
			SecretKeySpec signingKey = new SecretKeySpec(secretKey.getBytes("UTF-8"), "HmacSHA256");
			Mac mac = Mac.getInstance("HmacSHA256");
			mac.init(signingKey);
			
			byte[] rawHmac = mac.doFinal(message.getBytes("UTF-8"));
			encodeBase64String = Base64.encodeBase64String(rawHmac);
		} catch (InvalidKeyException | UnsupportedEncodingException | NoSuchAlgorithmException
				| IllegalStateException e) {
			System.out.println(e.getMessage());
		}
		return encodeBase64String;
	}
	
	public String makeSmsJson(SmsMessage ...messages) {
		SmsBody body = new SmsBody(from, messages);
		return new Gson().toJson(body);
	}
	
	@Override
	public String makeDigitCode() {
		String digitCode = "";
		for(int i=0; i<6; i++) {
			digitCode += ((int) (Math.random()*9));
		}
		return digitCode;
	}
}
