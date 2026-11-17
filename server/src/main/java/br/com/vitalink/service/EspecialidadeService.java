package br.com.vitalink.service;

import br.com.vitalink.dto.response.EspecialidadeDTO;
import br.com.vitalink.exception.RecursoNaoEncontradoException;
import br.com.vitalink.model.Especialidade;
import br.com.vitalink.repositories.EspecialidadeRepository;
import br.com.vitalink.repositories.MedicoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EspecialidadeService {

    private final EspecialidadeRepository especialidadeRepository;
    private final MedicoRepository medicoRepository;

    public EspecialidadeService(EspecialidadeRepository especialidadeRepository,
                                MedicoRepository medicoRepository) {
        this.especialidadeRepository = especialidadeRepository;
        this.medicoRepository = medicoRepository;
    }

    public List<EspecialidadeDTO> listarEspecialidades() {
        return especialidadeRepository.findAll().stream()
                .map(esp -> {
                    long totalMedicos = medicoRepository.findByEspecialidadesId(esp.getId()).size();
                    return new EspecialidadeDTO(esp, (int) totalMedicos);
                })
                .collect(Collectors.toList());
    }

    public Especialidade buscarPorId(Long id) {
        return especialidadeRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Especialidade não encontrada."));
    }
}