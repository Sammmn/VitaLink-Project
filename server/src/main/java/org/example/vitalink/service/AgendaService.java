package org.example.vitalink.service;

import org.example.vitalink.dto.response.HorarioDisponibleDTO;
import org.example.vitalink.dto.response.HorariosDisponivelsPorDataDTO;
import org.example.vitalink.model.Agenda;
import org.example.vitalink.repositories.AgendaRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AgendaService {

    private final AgendaRepository agendaRepository;

    public AgendaService(AgendaRepository agendaRepository) {
        this.agendaRepository = agendaRepository;
    }

    public HorariosDisponivelsPorDataDTO buscarHorariosDisponiveis(Long medicoId, LocalDate data) {
        List<Agenda> agendas = agendaRepository.findByProfissionalAndData(medicoId, data);

        return new HorariosDisponivelsPorDataDTO(
                data,
                agendas.stream()
                        .map(agenda -> new HorarioDisponibleDTO(agenda.getHorario(), agenda.isDisponivel()))
                        .collect(Collectors.toList())
        );
    }

    public Agenda criarAgenda(Agenda agenda) {
        return agendaRepository.save(agenda);
    }
}