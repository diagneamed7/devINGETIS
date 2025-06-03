package com.cwa.crud_springboot.Filter;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import com.cwa.crud_springboot.Configuration.JwtUtils;
import lombok.RequiredArgsConstructor;
import com.cwa.crud_springboot.service.CustomUserDetailsService;



@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

   private final CustomUserDetailsService userDetailsService;
    private final JwtUtils jwtUtils;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
       final String authorizationHeader = request.getHeader("Authorization");

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String jwtToken = authorizationHeader.substring(7);
            if (jwtUtils.validateToken(jwtToken)) {
                // Si le token est valide, vous pouvez ajouter des informations à la requête ou à la réponse
                // par exemple, en ajoutant l'utilisateur authentifié dans le contexte de sécurité
            }
        }
        if

        filterChain.doFilter(request, response);
    }
}
