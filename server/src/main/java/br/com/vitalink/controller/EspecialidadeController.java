package br.com.vitalink.controller;

import br.com.vitalink.dto.response.EspecialidadeDTO;
import br.com.vitalink.service.EspecialidadeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/especialidades")
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