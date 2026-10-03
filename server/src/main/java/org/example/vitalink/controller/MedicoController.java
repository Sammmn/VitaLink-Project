package org.example.vitalink.controller;

import org.example.vitalink.dto.request.LoginDTO;
import org.example.vitalink.dto.request.MedicoDTO;
import org.example.vitalink.dto.response.MedicoResponseDTO;
import org.example.vitalink.model.Agenda;
import org.example.vitalink.model.Medico;
import org.example.vitalink.service.AgendaService;
import org.example.vitalink.service.MedicoService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/medicos")
public class MedicoController {

    private final MedicoService medicoService;
    private final AgendaService agendaService;

    public MedicoController (MedicoService medicoService, AgendaService agendaService) {
        this.medicoService = medicoService;
        this.agendaService = agendaService;
    }

    @PostMapping
    public ResponseEntity<Medico> cadastrar(@RequestBody MedicoDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(medicoService.cadastrar(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Medico> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(medicoService.buscarPorId(id));
    }

    @GetMapping
    public ResponseEntity<List<Medico>> listarTodos() {
        return ResponseEntity.ok(medicoService.listarTodos());
    }

    @GetMapping("/especialidade/{id}")
    public ResponseEntity<List<Medico>> buscarPorEspecialidade(@PathVariable Long id) {
        return ResponseEntity.ok(medicoService.buscarPorEspecialidade(id));
    }

    @PostMapping("/login")
    public ResponseEntity<MedicoResponseDTO> login(@RequestBody LoginDTO dto) {
        Medico medico = medicoService.login(dto);
        return ResponseEntity.ok(new MedicoResponseDTO(medico));
    }

    @GetMapping("/{id}/horarios-disponiveis")
    public ResponseEntity<List<Agenda>> getHorariosDisponiveis(
            @PathVariable Long id,
            @RequestParam("data") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate data) {
        return ResponseEntity.ok(agendaService.listarHorariosDisponiveis(id, data));
    }
}