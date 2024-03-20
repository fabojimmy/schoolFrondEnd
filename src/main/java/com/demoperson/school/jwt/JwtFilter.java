package com.demoperson.school.jwt;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter{

     @Autowired
    private CustomerUsersDetailsService userDao;
   
    @Autowired
    private JwtUtil jwtUtil;

    String token=null;
    String username=null;
    Claims claim=null;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        // TODO Auto-generated method stub
         if(request.getServletPath().matches("/user/login|/user/forgotPassword|/user/signup"))
        {
            System.out.println("hhh");
                filterChain.doFilter(request, response);
        }
        else
        {

            String authHeader=request.getHeader("Authorization");
            
            if(authHeader!=null && authHeader.startsWith("Bearer ")) {
                token=authHeader.substring(7);
    
                System.out.println(token);
                username=jwtUtil.extractUsername(token);
                System.out.println(username+"lkkqklslqksklqklslkqslk");
                claim=jwtUtil.extractAllClaims(token);
            }
            // System.out.println(username+"cddd0"+SecurityContextHolder.getContext().getAuthentication());
            if (username!=null && SecurityContextHolder.getContext().getAuthentication()==null) {
                System.out.printf("Authentication");
                UserDetails userDetails=userDao.loadUserByUsername(username);
                
                if(jwtUtil.validateToken(token, userDetails)){
                    UsernamePasswordAuthenticationToken authenticationToken=new UsernamePasswordAuthenticationToken(userDetails, null,userDetails.getAuthorities());
                    authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                    System.out.println(userDetails.getAuthorities()+"--------"+claim.get("role")+"  "+isUser()+" "+getCurrentUser());
                }
            }
    
            filterChain.doFilter(request, response);
        }
    }

    public boolean isAdmin()
    {
        return "admin".equalsIgnoreCase((String) claim.get("role"));
    }
    public boolean isUser()
    {
        return "user".equalsIgnoreCase((String) claim.get("role"));
    }

    public String getCurrentUser(){

        return username;
    }
    
}
