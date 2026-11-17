package br.com.vitalink.controller;

import jakarta.validation.Valid;
import br.com.vitalink.dto.request.LoginDTO;
import br.com.vitalink.dto.request.UsuarioDTO;
import br.com.vitalink.dto.response.LoginResponseDTO;
import br.com.vitalink.dto.response.UsuarioResponseDTO;
import br.com.vitalink.security.UsuarioAutenticado;
import br.com.vitalink.service.AuthService;
import br.com.vitalink.service.UsuarioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;
    private final UsuarioService usuarioService;

    public AuthController(AuthService authService, UsuarioService usuarioService) {
        this.authService = authService;
        this.usuarioService = usuarioService;
    }

    /** Público. Devolve o JWT que deve ser enviado em "Authorization: Bearer ...". */
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@Valid @RequestBody LoginDTO dto) {
        return ResponseEntity.ok(authService.login(dto));
    }

    /** Público. Cadastro de paciente; já devolve o token (usuário entra logado). */
    @PostMapping("/register")
    public ResponseEntity<LoginResponseDTO> registrar(@Valid @RequestBody UsuarioDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.registrarPaciente(dto));
    }

    /** Protegido. Serve para provar que o token é aceito e para restaurar a sessão no front. */
    @GetMapping("/me")
    public ResponseEntity<UsuarioResponseDTO> me(@AuthenticationPrincipal UsuarioAutenticado atual) {
        return ResponseEntity.ok(new UsuarioResponseDTO(usuarioService.findById(atual.id())));
    }
}
