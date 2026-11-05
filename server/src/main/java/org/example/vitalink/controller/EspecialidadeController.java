package org.example.vitalink.controller;

import org.example.vitalink.dto.response.EspecialidadeDTO;
import org.example.vitalink.service.EspecialidadeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/especialidades")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class EspecialidadeController {

    private final EspecialidadeService especialidadeService;

    public EspecialidadeController(EspecialidadeService especialidadeService) {
        this.especialidadeService = especialidadeService;
    }

    @GetMapping
    public ResponseEntity<List<EspecialidadeDTO>> listarEspecialidades() {
        return ResponseEntity.ok(especialidadeService.listarEspecialidades());
    }
}