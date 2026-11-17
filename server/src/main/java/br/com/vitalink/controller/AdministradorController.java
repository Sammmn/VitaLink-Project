package br.com.vitalink.controller;

import jakarta.validation.Valid;
import br.com.vitalink.dto.request.AdministradorDTO;
import br.com.vitalink.dto.response.AdministradorResponseDTO;
import br.com.vitalink.service.AdministradorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/administradores")
public class AdministradorController {

    private final AdministradorService administradorService;

    public AdministradorController(AdministradorService administradorService) {
        this.administradorService = administradorService;
    }

    @PostMapping
    public ResponseEntity<AdministradorResponseDTO> cadastrar(@Valid @RequestBody AdministradorDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new AdministradorResponseDTO(administradorService.cadastrar(dto)));
    }
}
