package org.example.vitalink.service;

import org.example.vitalink.DTO.AdministradorDTO;
import org.example.vitalink.model.Administrador;
import org.example.vitalink.repositories.AdministradorRepository;
import org.springframework.stereotype.Service;

@Service
public class AdministradorService {

    private final AdministradorRepository repository;

    public AdministradorService(AdministradorRepository repository) {
        this.repository = repository;
    }

    public Administrador cadastrar(AdministradorDTO dto) {

        if (repository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Email já cadastrado");
        }

        Administrador administrador = new Administrador();

        administrador.setNome(dto.getNome());
        administrador.setCpf(dto.getCpf());
        administrador.setEmail(dto.getEmail());
        administrador.setSenha(dto.getSenha());

        return repository.save(administrador);
    }
}
