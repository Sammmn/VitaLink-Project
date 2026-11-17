package br.com.vitalink.controller;

import br.com.vitalink.dto.response.UsuarioResponseDTO;
import br.com.vitalink.model.Cargo;
import br.com.vitalink.security.UsuarioAutenticado;
import br.com.vitalink.service.UsuarioService;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    /** Cada usuário só vê o próprio cadastro; ADMIN vê qualquer um. */
    @GetMapping("/{id}")
    public UsuarioResponseDTO buscar(@PathVariable Long id,
                                     @AuthenticationPrincipal UsuarioAutenticado atual) {
        if (atual.cargo() != Cargo.ADMIN && !atual.id().equals(id)) {
            throw new AccessDeniedException("Acesso negado");
        }
        return new UsuarioResponseDTO(usuarioService.findById(id));
    }
}
