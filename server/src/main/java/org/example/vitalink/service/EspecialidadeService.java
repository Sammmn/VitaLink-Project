package org.example.vitalink.service;

import org.example.vitalink.dto.response.EspecialidadeDTO;
import org.example.vitalink.model.Especialidade;
import org.example.vitalink.repositories.EspecialidadeRepository;
import org.example.vitalink.repositories.MedicoRepository;
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
                .orElseThrow(() -> new RuntimeException("Especialidade não encontrada."));
    }
}