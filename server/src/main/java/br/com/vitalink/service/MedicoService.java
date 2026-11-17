package br.com.vitalink.service;

import br.com.vitalink.dto.request.MedicoDTO;
import br.com.vitalink.dto.response.MedicoListDTO;
import br.com.vitalink.exception.ConflitoException;
import br.com.vitalink.exception.RecursoNaoEncontradoException;
import br.com.vitalink.model.Cargo;
import br.com.vitalink.model.Especialidade;
import br.com.vitalink.model.Medico;
import br.com.vitalink.repositories.EspecialidadeRepository;
import br.com.vitalink.repositories.MedicoRepository;
import br.com.vitalink.repositories.UsuarioRepository;
import br.com.vitalink.util.Textos;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MedicoService {

    private final MedicoRepository medicoRepository;
    private final EspecialidadeRepository especialidadeRepository;
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public MedicoService(MedicoRepository medicoRepository, EspecialidadeRepository especialidadeRepository, UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {

        this.medicoRepository = medicoRepository;
        this.especialidadeRepository = especialidadeRepository;
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Medico cadastrar(MedicoDTO dto) {

        String email = Textos.normalizarEmail(dto.getEmail());
        String cpf = Textos.textoOuNull(dto.getCpf());

        if (usuarioRepository.existsByEmailIgnoreCase(email)) {
            throw new ConflitoException("Email já cadastrado.");
        }

        if (cpf != null && usuarioRepository.existsByCpf(cpf)) {
            throw new ConflitoException("CPF já cadastrado.");
        }

        if (medicoRepository.existsByRegistroProfissional(dto.getRegistroProfissional())) {
            throw new ConflitoException("Registro profissional já cadastrado.");
        }

        Medico medico = new Medico();

        medico.setNome(dto.getNome().trim());
        medico.setCpf(cpf);
        medico.setEmail(email);
        medico.setTelefone(Textos.textoOuNull(dto.getTelefone()));

        medico.setRegistroProfissional(dto.getRegistroProfissional());

        medico.setBiografia(dto.getBiografia());

        medico.setValorConsulta(dto.getValorConsulta());

        medico.setSenha(passwordEncoder.encode(dto.getSenha()));
        medico.setCargo(Cargo.PROFISSIONAL);

        List<Especialidade> especialidades = dto.getEspecialidades() == null
                ? new java.util.ArrayList<>()
                : especialidadeRepository.findAllById(dto.getEspecialidades());

        medico.setEspecialidades(especialidades);

        return medicoRepository.save(medico);
    }

    public Medico buscarPorId(Long id) {

        return medicoRepository.findById(id).orElseThrow(() -> new RecursoNaoEncontradoException("Médico não encontrado."));
    }

    public List<Medico> listarTodos() {
        return medicoRepository.findAll();
    }

    public List<Medico> buscarPorEspecialidade(Long id) {
        return medicoRepository.findByEspecialidadesId(id);
    }

    public List<MedicoListDTO> listarTodosFormatado() {
        return medicoRepository.findAll().stream()
                .map(MedicoListDTO::new)
                .collect(Collectors.toList());
    }

    public List<MedicoListDTO> listarPorEspecialidade(Long id) {
        return medicoRepository.findByEspecialidadesId(id).stream()
                .map(MedicoListDTO::new)
                .collect(Collectors.toList());
    }
}
