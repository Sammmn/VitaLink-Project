package br.com.vitalink.config;

import br.com.vitalink.security.JwtAuthFilter;
import br.com.vitalink.security.JwtService;
import br.com.vitalink.security.RestAccessDeniedHandler;
import br.com.vitalink.security.RestAuthenticationEntryPoint;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http,
                                                   JwtService jwtService,
                                                   RestAuthenticationEntryPoint entryPoint,
                                                   RestAccessDeniedHandler accessDeniedHandler,
                                                   CorsConfigurationSource corsConfigurationSource) throws Exception {
        http
                // API stateless com Bearer token: sem sessão, sem formulário, sem CSRF
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(corsConfigurationSource))
                .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .httpBasic(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable)
                .exceptionHandling(e -> e
                        .authenticationEntryPoint(entryPoint)
                        .accessDeniedHandler(accessDeniedHandler))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .requestMatchers("/error", "/actuator/health").permitAll()
                        .requestMatchers(HttpMethod.POST, "/auth/login", "/auth/register").permitAll()
                        // RBAC (docs/RBAC.md)
                        .requestMatchers(HttpMethod.POST, "/medicos", "/administradores").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/psicologos").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/fisioterapeutas").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/agendas").hasAnyRole("ADMIN", "PROFISSIONAL")
                        .requestMatchers(HttpMethod.POST, "/pacientes").permitAll()
                        .requestMatchers(HttpMethod.POST, "/consultas").hasRole("PACIENTE")
                        .requestMatchers(HttpMethod.GET, "/consultas/historico").hasAnyRole("PACIENTE", "PROFISSIONAL", "ADMIN")
                        .anyRequest().authenticated())
                .addFilterBefore(new JwtAuthFilter(jwtService), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource(
            @Value("${app.cors.allowed-origins:http://localhost:5173}") String[] origensPermitidas) {

        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of(origensPermitidas));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("Authorization", "Content-Type"));
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
