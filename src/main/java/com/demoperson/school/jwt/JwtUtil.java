package com.demoperson.school.jwt;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {
    
    private String secret="fabodaysh1445sqkjhsqhsgyuqguza213598qsqkjbhsijnklhkqsjgjqkjshdjgjqhsvbkj89489qsjhbqshjqjsjhqbqvsbhskjxb";

    // la clé de la signature avec le token
      private Key getSignKey()
    {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
            return Keys.hmacShaKeyFor(keyBytes);
    }  

    // Create Token
    private String createToken(Map<String, Object>claim,String username){

        // System.out.println(new Date((System.currentTimeMillis())));
        return Jwts.builder()
                   .setSubject(username)
                   .setClaims(claim)
                   .setIssuedAt(new Date(System.currentTimeMillis()))
                   .setExpiration(new Date(System.currentTimeMillis()+1000*60*2))
                   .signWith(getSignKey(),SignatureAlgorithm.HS256)
                   .compact();
    }

    //generate Token
    public String generateToken(String username,String role)
    {
        Map<String,Object>claims=new HashMap<>();
        claims.put("role",role);
        return this.createToken(claims, username);
    }

    //il faut dechivrer le token pour les differents informations sur utilisateur

      //Dechivrer le token
    public Claims extractAllClaims(String token)
    {

        return Jwts.parser()
                   .setSigningKey(secret)
                   .parseClaimsJws(token)
                   .getBody();
    }

      //Avoir le informations sur de claims

      public <T> T extractClaims(String token ,Function<Claims,T> claimResolver)
      {
          final Claims claims =extractAllClaims(token);
  
          return claimResolver.apply(claims);
      }


      //Maintenant extrait les informations sur utilisateur
        public String extractUsername(String token)
        {
            return extractClaims(token, Claims::getSubject);
        }
    
        public Date extractExpiration(String token){
    
            return extractClaims(token,Claims::getExpiration);
        }
  
        private boolean isTokenExpired(String token) {
            return extractExpiration(token).before(new Date());
        }

        public Boolean validateToken(String token,UserDetails userDetails){

            final String username=extractUsername(token);
            return(username.equals(userDetails.getUsername())&&!isTokenExpired(token));
        }
}
