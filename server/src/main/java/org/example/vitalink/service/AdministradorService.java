package org.example.vitalink.service;

import org.example.vitalink.dto.request.AdministradorDTO;
import org.example.vitalink.dto.request.LoginDTO;
import org.example.vitalink.model.Administrador;
import org.example.vitalink.repositories.AdministradorRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdministradorService {

    private final AdministradorRepository repository;
    private final PasswordEncoder passwordEncoder;

    public AdministradorService(AdministradorRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    public Administrador cadastrar(AdministradorDTO dto) {

        if (repository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Email já cadastrado");
        }

        Administrador administrador = new Administrador();

        administrador.setNome(dto.getNome());
        administrador.setCpf(dto.getCpf());
        administrador.setEmail(dto.getEmail());
        administrador.setSenha(passwordEncoder.encode(dto.getSenha()));

        return repository.save(administrador);
    }

    public Administrador login(LoginDTO dto) {
        Administrador administrador = repository.findByEmail(dto.getEmail()).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        if (!passwordEncoder.matches(dto.getSenha(), administrador.getSenha())) {
            throw new RuntimeException("Senha inválida");
        }
        return administrador;
    }
}
