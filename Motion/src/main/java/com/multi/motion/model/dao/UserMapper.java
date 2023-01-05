package com.multi.motion.model.dao;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.ResultMap;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.multi.motion.model.dto.UserDto;

@Mapper
public interface UserMapper {
	
	@Results(id = "userResultMap", value = {
			@Result(property = "userID", column = "USER_ID_PK"),
			@Result(property = "userPW", column = "USER_PW"),
			@Result(property = "userName", column = "USER_NAME"),
			@Result(property = "phoneNumber", column = "PHONE_NUMBER"),
			@Result(property = "userGrade", column = "USER_GRADE"),
			@Result(property = "registeredDate", column = "REGISTERED"),
			@Result(property = "isResigned", column = "RESIGNED")
	})
	
	@Select("SELECT * FROM USER_TB WHERE USER_ID_PK = #{userID}")
	UserDto selectOneFromId(String userID);
	
	@ResultMap("userResultMap")
	@Select("SELECT * FROM USER_TB WHERE PHONE_NUMBER = #{phoneNumber}")
	UserDto selectOneFromPhoneNumber(String phoneNumber);
	
	@ResultMap("userResultMap")
	@Insert("INSERT INTO USER_TB VALUES(#{userID}, #{userPW}, #{userName}, #{phoneNumber}, #{userGrade}, NOW(), false)")
	int insert(UserDto dto);
	
	@ResultMap("userResultMap")
	@Update("UPDATE USER_TB SET USER_PW = #{userPW} WHERE PHONE_NUMBER = #{phoneNumber}")
	int updatePw(UserDto dto);
	
	@ResultMap("userResultMap")
	@Update("UPDATE USER_TB SET USER_NAME = #{userName} WHERE PHONE_NUMBER = #{phoneNumber}")
	int updateName(UserDto dto);
}
