package org.example.vitalink.controller;

import org.example.vitalink.dto.response.HorariosDisponiveisPorDataDTO;
import org.example.vitalink.model.Agenda;
import org.example.vitalink.service.AgendaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/agendas")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AgendaController {

    private final AgendaService agendaService;

    public AgendaController(AgendaService agendaService) {
        this.agendaService = agendaService;
    }

    @GetMapping("/medico/{medicoId}/data/{data}")
    public ResponseEntity<HorariosDisponiveisPorDataDTO> buscarHorariosDisponiveis(
            @PathVariable Long medicoId,
            @PathVariable String data) {

        LocalDate localDate = LocalDate.parse(data);
        return ResponseEntity.ok(agendaService.buscarHorariosDisponiveis(medicoId, localDate));
    }

    @PostMapping
    public ResponseEntity<Agenda> criarAgenda(@RequestBody Agenda agenda) {
        return ResponseEntity.status(HttpStatus.CREATED).body(agendaService.criarAgenda(agenda));
    }
}