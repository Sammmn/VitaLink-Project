package org.example.vitalink.service;

import org.example.vitalink.dto.request.RegistroAtendimentoDTO;
import org.example.vitalink.dto.response.ConsultaResponseDTO;
import org.example.vitalink.model.Consulta;
import org.example.vitalink.model.StatusConsulta;
import org.example.vitalink.repositories.ConsultaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ConsultaService {

    private final ConsultaRepository consultaRepository;

    public ConsultaService(ConsultaRepository consultaRepository) {
        this.consultaRepository = consultaRepository;
    }

    // RF10: Buscar agenda do médico/profissional em uma data
    public List<ConsultaResponseDTO> obterAgendaProfissional(Long profissionalId, LocalDate data) {
        LocalDate dataConsulta = (data != null) ? data : LocalDate.now();
        LocalDateTime inicio = dataConsulta.atStartOfDay();
        LocalDateTime fim = dataConsulta.atTime(LocalTime.MAX);

        return consultaRepository.buscarAgendaPorProfissionalEPeriodo(profissionalId, inicio, fim)
                .stream()
                .map(ConsultaResponseDTO::new)
                .collect(Collectors.toList());
    }

    // RF11: Marcar consulta como "realizada" e registrar atendimento clínico
    @Transactional
    public ConsultaResponseDTO marcarComoRealizada(Long consultaId, Long profissionalId, RegistroAtendimentoDTO dados) {
        Consulta consulta = consultaRepository.findById(consultaId)
                .orElseThrow(() -> new RuntimeException("Consulta não encontrada com o ID: " + consultaId));

        if (!consulta.getProfissional().getId().equals(profissionalId)) {
            throw new RuntimeException("Acesso negado: o profissional não é o responsável por esta consulta.");
        }

        if (consulta.getStatus() == StatusConsulta.CANCELADA) {
            throw new RuntimeException("Não é possível realizar uma consulta que foi cancelada.");
        }

        if (consulta.getStatus() == StatusConsulta.REALIZADA) {
            throw new RuntimeException("Esta consulta já foi finalizada anteriormente.");
        }

        consulta.setStatus(StatusConsulta.REALIZADA);
        consulta.setDiagnostico(dados.getDiagnostico());
        consulta.setPrescricao(dados.getPrescricao());
        consulta.setObservacoes(dados.getObservacoes());

        return new ConsultaResponseDTO(consultaRepository.save(consulta));
    }
}