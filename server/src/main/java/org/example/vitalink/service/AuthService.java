package org.example.vitalink.service;

import org.example.vitalink.dto.request.LoginDTO;
import org.example.vitalink.model.Usuario;
import org.example.vitalink.repositories.UsuarioRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UsuarioRepository usuarioRepository;

    public AuthService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public Usuario login(LoginDTO dto) {

        Usuario usuario = usuarioRepository.findByEmail(dto.getEmail()).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        if (!usuario.getSenha().equals(dto.getSenha())) {
            throw new RuntimeException("Senha incorreta!");
        }

        return usuario;
    }
}
