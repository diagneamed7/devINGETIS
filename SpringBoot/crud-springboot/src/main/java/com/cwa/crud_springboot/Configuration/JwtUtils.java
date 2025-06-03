package com.cwa.crud_springboot.Configuration;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.JwtBuilder;

@Component
public class JwtUtils {
    //toutes les methodes pour manipuler le JWT

    @Value("${app.secret-key}")
    private String secretKey;

    @Value("${app.expiration-ms}")
    private long expirationMs;

    public String generateToken(String username) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, username);
    }

    private String createToken(Map<String, Object> claims, String subject) {
        // Implémentez la logique pour créer un JWT avec les claims et le sujet
        // Utilisez une bibliothèque comme JJWT ou autre pour générer le token
        return Jwts.Builder()
        .setClaims(claims)
        .setSubject(subject)
        .setIssuedAt(new Date(System.currentTimeMillis()))
        .setExpiration(new Date(System.currentTimeMillis() + expirationMs))
        .signWith(getSignKey(), SignatureAlgorithm.HS256)
        .compact();
    }

    private Key getSignKey() {
        byte[] secretKeyBytes = secretKey.getBytes();
        // Implémentez la logique pour obtenir la clé de signature à partir de secretKey
        // Par exemple, vous pouvez utiliser Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
        return new secretKeySpec(secretKeyBytes, SignatureAlgorithm.HS256.getJcaName());
    }

    public Boolean validateToken(String token) {
       String username = extractUsername(token);
        return (username != null && !isTokenExpired(token));
    }

    priavte boolean isTokenExpired(String token) {
        // Implémentez la logique pour vérifier si le token est expiré
        return extractExpiration(token).before(new Date());
    }
    private String extractUsername(String token) {
        // Implémentez la logique pour extraire le nom d'utilisateur du token
        return  extractClaim(token, Claims::getSubject);
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    private Claims extractAllClaims(String token) {
        // Implémentez la logique pour extraire toutes les revendications du token
        return Jwts.parser().setSigningKey(getSignKey()).parseClaimsJws(token).getBody();
    }
}
