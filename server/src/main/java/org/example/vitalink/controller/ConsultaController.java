package org.example.vitalink.controller;

import jakarta.validation.Valid;
import org.example.vitalink.dto.request.RegistroAtendimentoDTO;
import org.example.vitalink.dto.response.ConsultaResponseDTO;
import org.example.vitalink.service.ConsultaService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/consultas")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ConsultaController {

    private final ConsultaService consultaService;

    public ConsultaController(ConsultaService consultaService) {
        this.consultaService = consultaService;
    }

    // RF10: GET /consultas/agenda?profissionalId=1&data=2026-10-05
    @GetMapping("/agenda")
    public ResponseEntity<List<ConsultaResponseDTO>> obterAgenda(
            @RequestParam Long profissionalId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate data
    ) {
        List<ConsultaResponseDTO> agenda = consultaService.obterAgendaProfissional(profissionalId, data);
        return ResponseEntity.ok(agenda);
    }

    // RF11: PATCH /consultas/{id}/realizar?profissionalId=1
    @PatchMapping("/{id}/realizar")
    public ResponseEntity<ConsultaResponseDTO> marcarRealizada(
            @PathVariable Long id,
            @RequestParam Long profissionalId,
            @RequestBody @Valid RegistroAtendimentoDTO dados
    ) {
        ConsultaResponseDTO resultado = consultaService.marcarComoRealizada(id, profissionalId, dados);
        return ResponseEntity.ok(resultado);
    }
}