package com.demoperson.school.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.demoperson.school.POJO.Users;

public interface UserDao extends JpaRepository<Users,Integer> {

    public Users findByEmailId(@Param("email")String email);
    
}
