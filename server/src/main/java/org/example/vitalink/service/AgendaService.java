package org.example.vitalink.service;

import org.example.vitalink.dto.response.HorarioDisponivelDTO;
import org.example.vitalink.dto.response.HorariosDisponiveisPorDataDTO;
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

    public HorariosDisponiveisPorDataDTO buscarHorariosDisponiveis(Long medicoId, LocalDate data) {
        List<Agenda> agendas = agendaRepository.findByProfissionalIdAndData(medicoId, data);

        return new HorariosDisponiveisPorDataDTO(
                data,
                agendas.stream()
                        .map(agenda -> new HorarioDisponivelDTO(agenda.getHorario(), agenda.isDisponivel()))
                        .collect(Collectors.toList())
        );
    }

    public Agenda criarAgenda(Agenda agenda) {
        return agendaRepository.save(agenda);
    }
}