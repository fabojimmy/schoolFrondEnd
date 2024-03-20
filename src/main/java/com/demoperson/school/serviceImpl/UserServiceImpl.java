package com.demoperson.school.serviceImpl;

import java.util.Map;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.demoperson.school.POJO.Users;
import com.demoperson.school.dao.UserDao;
import com.demoperson.school.jwt.CustomerUsersDetailsService;
import com.demoperson.school.jwt.JwtUtil;
import com.demoperson.school.service.UserService;
import com.demoperson.school.utils.CafeUtils;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserDao userDao;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    CustomerUsersDetailsService customerUsersDetailsService;
    @Autowired
    JwtUtil jwtUtil;

    @Override
    public ResponseEntity<String> signUp(Map<String, String> requestMap) {
        // TODO Auto-generated method stub
        System.out.println(requestMap);
        try {
            if(validateSignUpMap(requestMap)) {
                Users users=userDao.findByEmailId(requestMap.get("email"));
                if(Objects.isNull(users))
                {
                    userDao.save(getUserFromMap(requestMap));
                    return CafeUtils.getResponseEntity("Data added", HttpStatus.OK);
                }else{
                    
                    return CafeUtils.getResponseEntity("Email already exits", HttpStatus.BAD_REQUEST);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        throw new UnsupportedOperationException("Unimplemented method 'signUp'");
    }

    private Users getUserFromMap(Map<String, String> requestMap) {
        // TODO Auto-generated method stub
        Users user = new Users();
                user.setName(requestMap.get("name"));
                user.setContactNumber(requestMap.get("contactNumber"));
                user.setEmail(requestMap.get("email"));
                user.setPassword(new BCryptPasswordEncoder().encode(requestMap.get("password")));
                user.setRole(requestMap.get("role"));
                
                user.setStatus("true");
                return user;    }

    private boolean validateSignUpMap(Map<String, String> requestMap) {
        // TODO Auto-generated method stub
        if(requestMap.containsKey("name")&&requestMap.containsKey("contactNumber")&&requestMap.containsKey("email")
          && requestMap.containsKey("password")) {

            return true;
          }
            return false;
    }

    @Override
    public ResponseEntity<String> login(Map<String, String> requestMap) {
        // TODO Auto-generated method stub
        final org.springframework.security.core.Authentication authentication=authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(requestMap.get("email"), requestMap.get("password"))
            );
        try {

                if(authentication.isAuthenticated()){
                     if(customerUsersDetailsService.getUserDetail().getStatus().equalsIgnoreCase("true"))
                     {
                        return new ResponseEntity<String>("{\"token\":\"" +jwtUtil.generateToken(customerUsersDetailsService.getUserDetail().getEmail(), customerUsersDetailsService.getUserDetail().getRole())+"\"}",HttpStatus.OK);
                        
                     }else
                     {
                        return new ResponseEntity<String>("ppppppp",HttpStatus.BAD_REQUEST);

                     }
                }else{
                    return new ResponseEntity<String>("Yuuuu",HttpStatus.BAD_REQUEST);
                }
            
        } catch (Exception e) {
           e.printStackTrace();
        }
        return null;
    }
    


}
