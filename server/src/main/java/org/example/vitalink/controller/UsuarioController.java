package org.example.vitalink.controller;

import org.example.vitalink.model.Usuario;
import org.example.vitalink.service.UsuarioService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping("/{id}")
    public Usuario buscar(@PathVariable Long id) {
        return usuarioService.findById(id);
    }
}
