package org.example.vitalink.controller;

import org.example.vitalink.dto.request.AdministradorDTO;
import org.example.vitalink.dto.request.LoginDTO;
import org.example.vitalink.model.Administrador;
import org.example.vitalink.service.AdministradorService;
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
    public ResponseEntity<Administrador> cadastrar(@RequestBody AdministradorDTO dto) {

        return ResponseEntity.status(HttpStatus.CREATED).body(administradorService.cadastrar(dto));
    }

    @PostMapping("/login")
    public ResponseEntity<Administrador> login(@RequestBody LoginDTO dto) {
        Administrador administrador = administradorService.login(dto);
        return ResponseEntity.ok(administrador);
    }
}
