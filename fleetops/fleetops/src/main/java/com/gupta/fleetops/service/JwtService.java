package com.gupta.fleetops.service;


import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtService {

    // Hex-encoded secret key (not Base64)
    public static final String SECRET = "5367566859703373367639792F423F452848284D6251655468576D5A71347437";

    // Generates token with just email as subject
    public String generateToken(String email) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, email);
    }

    // Creates JWT with claims and email
    private String createToken(Map<String, Object> claims, String email) {
        long expirationTimeMillis = 1000 * 60 * 30; // 30 minutes


        String token = Jwts.builder()
                .setClaims(claims)
                .setSubject(email)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expirationTimeMillis))
                .signWith(getSignKey(), SignatureAlgorithm.HS256)
                .compact();

        System.out.println("Generated token for email: " + email);
        System.out.println("Token: " + token);
        return token;
    }

    // Get the signing key from the hex string
    private Key getSignKey() {
        byte[] keyBytes = hexStringToByteArray(SECRET);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    // Decode hex string to byte[]
    private byte[] hexStringToByteArray(String s) {
        int len = s.length();
        byte[] data = new byte[len / 2];
        for (int i = 0; i < len; i += 2) {
            data[i / 2] = (byte) (
                    (Character.digit(s.charAt(i), 16) << 4)
                            + Character.digit(s.charAt(i + 1), 16)
            );
        }
        return data;
    }

    // Extract username (email) from token
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // Extract expiration time from token
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    // Extract any claim with a resolver
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // Parse and extract claims
    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // Check if token is expired
    private Boolean isTokenExpired(String token) {
        boolean expired = extractExpiration(token).before(new Date());
        System.out.println("Is token expired? " + expired);
        return expired;
    }

    // Validate token with user details
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        boolean valid = username.equals(userDetails.getUsername()) && !isTokenExpired(token);

        System.out.println("Validating token...");
        System.out.println("Expected username: " + userDetails.getUsername());
        System.out.println("Extracted username: " + username);
        System.out.println("Token is valid? " + valid);

        return valid;
    }
}
