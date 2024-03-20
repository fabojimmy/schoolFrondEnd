package com.demoperson.school.jwt;

import java.util.ArrayList;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.demoperson.school.POJO.Users;
import com.demoperson.school.dao.UserDao;

@Service
public class CustomerUsersDetailsService implements UserDetailsService {

    @Autowired
    private UserDao userDao;

    private Users users;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        users=userDao.findByEmailId(username);

        if(!Objects.isNull(users))
        {
         return new org.springframework.security.core.userdetails.User(users.getEmail(),users.getPassword(),new ArrayList<>());

        }

        throw new UnsupportedOperationException("Unimplemented method 'loadUserByUsername'");
    }

    public Users getUserDetail(){

        return users;
    }
    
}
