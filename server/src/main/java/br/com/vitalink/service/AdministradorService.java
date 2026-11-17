package br.com.vitalink.service;

import br.com.vitalink.dto.request.AdministradorDTO;
import br.com.vitalink.exception.ConflitoException;
import br.com.vitalink.model.Administrador;
import br.com.vitalink.model.Cargo;
import br.com.vitalink.repositories.AdministradorRepository;
import br.com.vitalink.repositories.UsuarioRepository;
import br.com.vitalink.util.Textos;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdministradorService {

    private final AdministradorRepository repository;
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public AdministradorService(AdministradorRepository repository, UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Administrador cadastrar(AdministradorDTO dto) {

        String email = Textos.normalizarEmail(dto.getEmail());
        String cpf = Textos.textoOuNull(dto.getCpf());

        if (usuarioRepository.existsByEmailIgnoreCase(email)) {
            throw new ConflitoException("Email já cadastrado");
        }
        if (cpf != null && usuarioRepository.existsByCpf(cpf)) {
            throw new ConflitoException("CPF já cadastrado");
        }

        Administrador administrador = new Administrador();

        administrador.setNome(dto.getNome().trim());
        administrador.setCpf(cpf);
        administrador.setEmail(email);
        administrador.setTelefone(Textos.textoOuNull(dto.getTelefone()));
        administrador.setNivelAcesso(dto.getNivelAcesso());
        administrador.setSenha(passwordEncoder.encode(dto.getSenha()));
        administrador.setCargo(Cargo.ADMIN);

        return repository.save(administrador);
    }
}
