package org.example.vitalink.service;

import org.example.vitalink.dto.request.ConsultaRequestDTO;
import org.example.vitalink.dto.response.ConsultaResponseDTO;
import org.example.vitalink.model.Consulta;
import org.example.vitalink.model.Medico;
import org.example.vitalink.model.Paciente;
import org.example.vitalink.repositories.ConsultaRepository;
import org.example.vitalink.repositories.MedicoRepository;
import org.example.vitalink.repositories.PacienteRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ConsultaService {

    private final ConsultaRepository consultaRepository;
    private final MedicoRepository medicoRepository;
    private final PacienteRepository pacienteRepository;

    public ConsultaService(ConsultaRepository consultaRepository,
                           MedicoRepository medicoRepository,
                           PacienteRepository pacienteRepository) {
        this.consultaRepository = consultaRepository;
        this.medicoRepository = medicoRepository;
        this.pacienteRepository = pacienteRepository;
    }

    public ConsultaResponseDTO agendarConsulta(ConsultaRequestDTO dto, Long pacienteId) {

        Medico medico = medicoRepository.findById(dto.getMedicoId())
                .orElseThrow(() -> new RuntimeException("Médico não encontrado."));

        Paciente paciente = pacienteRepository.findById(pacienteId)
                .orElseThrow(() -> new RuntimeException("Paciente não encontrado."));

        if (consultaRepository.existsByMedicoIdAndDataHora(dto.getMedicoId(), dto.getDataHora())) {
            throw new RuntimeException("O médico já possui um agendamento para este horário.");
        }

        if (consultaRepository.existsByPacienteIdAndDataHora(pacienteId, dto.getDataHora())) {
            throw new RuntimeException("Você já possui uma consulta agendada para este mesmo horário.");
        }

        Consulta consulta = new Consulta();
        consulta.setMedico(medico);
        consulta.setPaciente(paciente);
        consulta.setDataHora(dto.getDataHora());
        consulta.setStatus("AGENDADA");

        Consulta consultaSalva = consultaRepository.save(consulta);

        return converterParaDTO(consultaSalva);
    }

    public List<ConsultaResponseDTO> obterHistoricoPaciente(Long pacienteId) {
        List<Consulta> consultas = consultaRepository.findByPacienteId(pacienteId);

        return consultas.stream()
                .map(this::converterParaDTO)
                .collect(Collectors.toList());
    }

    private ConsultaResponseDTO converterParaDTO(Consulta consulta) {
        ConsultaResponseDTO dto = new ConsultaResponseDTO();
        dto.setId(consulta.getId());

        if (consulta.getMedico() != null) {
            dto.setMedicoId(consulta.getMedico().getId());
            dto.setNomeMedico(consulta.getMedico().getNome());
        }

        if (consulta.getPaciente() != null) {
            dto.setPacienteId(consulta.getPaciente().getId());
            dto.setNomePaciente(consulta.getPaciente().getNome());
        }

        dto.setDataHora(consulta.getDataHora());
        dto.setStatus(consulta.getStatus());

        return dto;
    }
}