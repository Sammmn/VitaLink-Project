package org.example.vitalink.service;

import org.example.vitalink.dto.request.LoginDTO;
import org.example.vitalink.dto.request.MedicoDTO;
import org.example.vitalink.model.Especialidade;
import org.example.vitalink.model.Medico;
import org.example.vitalink.repositories.EspecialidadeRepository;
import org.example.vitalink.repositories.MedicoRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Service
public class MedicoService {

    private final MedicoRepository medicoRepository;
    private final EspecialidadeRepository especialidadeRepository;
    private final PasswordEncoder passwordEncoder;

    public MedicoService(MedicoRepository medicoRepository, EspecialidadeRepository especialidadeRepository, PasswordEncoder passwordEncoder) {

        this.medicoRepository = medicoRepository;
        this.especialidadeRepository = especialidadeRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Medico cadastrar(MedicoDTO dto) {

        if (medicoRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Email já cadastrado.");
        }

        if (medicoRepository.existsByCpf(dto.getCpf())) {
            throw new RuntimeException("CPF já cadastrado.");
        }

        if (medicoRepository.existsByRegistroProfissional(dto.getRegistroProfissional())) {

            throw new RuntimeException("Registro profissional já cadastrado.");
        }

        Medico medico = new Medico();

        medico.setNome(dto.getNome());
        medico.setCpf(dto.getCpf());
        medico.setEmail(dto.getEmail());
        medico.setTelefone(dto.getTelefone());

        medico.setRegistroProfissional(dto.getRegistroProfissional());

        medico.setBiografia(dto.getBiografia());

        medico.setValorConsulta(dto.getValorConsulta());

        medico.setSenha(passwordEncoder.encode(dto.getSenha()));

        List<Especialidade> especialidades = especialidadeRepository.findAllById(dto.getEspecialidades());

        medico.setEspecialidades(especialidades);

        return medicoRepository.save(medico);
    }

    public Medico buscarPorId(Long id) {

        return medicoRepository.findById(id).orElseThrow(() -> new RuntimeException("Médico não encontrado."));
    }

    public List<Medico> listarTodos() {
        return medicoRepository.findAll();
    }

    public List<Medico> buscarPorEspecialidade(Long id) {
        return medicoRepository.findByEspecialidadesId(id);
    }

    public Medico login(LoginDTO dto) {
        Medico medico = medicoRepository.findByEmail(dto.getEmail()).orElseThrow(() -> new RuntimeException("Médico não encontrado."));
        if (!passwordEncoder.matches(dto.getSenha(), medico.getSenha())) {
            throw new RuntimeException("Senha inválida.");
        }
        return medico;
    }
}
