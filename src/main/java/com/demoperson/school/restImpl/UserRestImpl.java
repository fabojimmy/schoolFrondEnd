package com.demoperson.school.restImpl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.demoperson.school.rest.UserRest;
import com.demoperson.school.service.UserService;


@RestController
public class UserRestImpl implements UserRest {

    @Autowired
    UserService userService;
    @Override
    public ResponseEntity<String> signup(Map<String, String> requestMap) {

        try {

            return userService.signUp(requestMap);
            
            
        } catch (Exception e) {
            e.printStackTrace();
        }
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'signup'");
    }
    @Override
    public ResponseEntity<String> login(Map<String, String> requestMap) {
        try {
            return userService.login(requestMap);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
        }
        throw new UnsupportedOperationException("Unimplemented method 'login'");
    }
    
}
