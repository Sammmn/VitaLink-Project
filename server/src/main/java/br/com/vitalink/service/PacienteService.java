package br.com.vitalink.service;

import br.com.vitalink.dto.request.UsuarioDTO;
import br.com.vitalink.exception.ConflitoException;
import br.com.vitalink.model.Cargo;
import br.com.vitalink.model.Paciente;
import br.com.vitalink.repositories.PacienteRepository;
import br.com.vitalink.repositories.UsuarioRepository;
import br.com.vitalink.util.Textos;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class PacienteService {

    private final PacienteRepository pacienteRepository;
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public PacienteService(PacienteRepository pacienteRepository,
                           UsuarioRepository usuarioRepository,
                           PasswordEncoder passwordEncoder) {
        this.pacienteRepository = pacienteRepository;
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Paciente cadastrar(UsuarioDTO dto) {
        String email = Textos.normalizarEmail(dto.getEmail());
        String cpf = Textos.textoOuNull(dto.getCpf());

        if (usuarioRepository.existsByEmailIgnoreCase(email)) {
            throw new ConflitoException("Email já cadastrado.");
        }
        if (cpf != null && usuarioRepository.existsByCpf(cpf)) {
            throw new ConflitoException("CPF já cadastrado.");
        }

        Paciente paciente = new Paciente();
        paciente.setNome(dto.getNome().trim());
        paciente.setCpf(cpf);
        paciente.setEmail(email);
        paciente.setTelefone(Textos.textoOuNull(dto.getTelefone()));
        paciente.setSenha(passwordEncoder.encode(dto.getSenha()));
        paciente.setCargo(Cargo.PACIENTE);

        return pacienteRepository.save(paciente);
    }
}
