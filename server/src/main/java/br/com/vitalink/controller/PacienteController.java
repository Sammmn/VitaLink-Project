package br.com.vitalink.controller;

import jakarta.validation.Valid;
import br.com.vitalink.dto.request.UsuarioDTO;
import br.com.vitalink.service.PacienteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/pacientes")
public class PacienteController {

    private final PacienteService pacienteService;

    public PacienteController(PacienteService pacienteService) {
        this.pacienteService = pacienteService;
    }

    @PostMapping
    public ResponseEntity<Void> cadastrar(
            @Valid @RequestBody UsuarioDTO dto) {

        pacienteService.cadastrar(dto);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
