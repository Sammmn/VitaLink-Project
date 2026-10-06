package org.example.vitalink.service;

import org.example.vitalink.dto.request.LoginDTO;
import org.example.vitalink.model.Usuario;
import org.example.vitalink.repositories.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {

        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Usuario login(LoginDTO dto) {

        Usuario usuario = usuarioRepository.findByEmail(dto.getEmail()).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        if (!passwordEncoder.matches(dto.getSenha(), usuario.getSenha())) {
            throw new RuntimeException("Senha incorreta!");
        }

        return usuario;
    }
}
