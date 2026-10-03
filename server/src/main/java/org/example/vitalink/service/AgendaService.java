package org.example.vitalink.service;

import org.example.vitalink.model.Agenda;
import org.example.vitalink.repositories.AgendaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AgendaService {

    @Autowired
    private AgendaRepository agendaRepository;

    public List<Agenda> listarHorariosDisponiveis(Long medicoId, LocalDate data) {
        return agendaRepository.findByProfissionalIdAndDataAndDisponivelTrue(medicoId, data);
    }
}