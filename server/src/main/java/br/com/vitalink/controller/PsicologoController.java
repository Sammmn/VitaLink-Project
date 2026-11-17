package br.com.vitalink.controller;

import jakarta.validation.Valid;
import br.com.vitalink.dto.request.PsicologoDTO;
import br.com.vitalink.service.PsicologoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/psicologos")
public class PsicologoController {

    private final PsicologoService psicologoService;

    public PsicologoController(PsicologoService psicologoService) {
        this.psicologoService = psicologoService;
    }

    @PostMapping
    public ResponseEntity<Void> cadastrar(
            @Valid @RequestBody PsicologoDTO dto) {

        psicologoService.cadastrar(dto);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
