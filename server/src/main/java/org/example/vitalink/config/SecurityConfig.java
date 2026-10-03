package org.example.vitalink.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                // Rotas públicas (Login, Cadastro)
                .requestMatchers("/usuarios/login", "/usuarios/cadastrar", "/auth/**").permitAll()

                // Rotas de Administrador
                .requestMatchers("/administradores/**").hasRole("ADMIN")

                // Rotas por profissional / especialidade
                .requestMatchers("/medicos/**").hasAnyRole("MEDICO", "ADMIN")
                .requestMatchers("/fisioterapeutas/**").hasAnyRole("FISIOTERAPEUTA", "ADMIN")
                .requestMatchers("/psicologos/**").hasAnyRole("PSICOLOGO", "ADMIN")

                // Rotas de Paciente
                .requestMatchers("/pacientes/**").hasAnyRole("PACIENTE", "ADMIN")

                // Qualquer outra requisição precisa estar autenticada
                .anyRequest().authenticated()
            )
            .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}