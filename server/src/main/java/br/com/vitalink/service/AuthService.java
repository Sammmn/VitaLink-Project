package br.com.vitalink.service;

import br.com.vitalink.dto.request.LoginDTO;
import br.com.vitalink.dto.request.UsuarioDTO;
import br.com.vitalink.dto.response.LoginResponseDTO;
import br.com.vitalink.exception.CredenciaisInvalidasException;
import br.com.vitalink.model.Administrador;
import br.com.vitalink.model.Cargo;
import br.com.vitalink.model.Paciente;
import br.com.vitalink.model.Profissional;
import br.com.vitalink.model.Usuario;
import br.com.vitalink.repositories.UsuarioRepository;
import br.com.vitalink.security.JwtService;
import br.com.vitalink.util.Textos;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final PacienteService pacienteService;

    // Hash falso usado quando o e-mail não existe, para o tempo de resposta
    // ser parecido com o de uma senha errada (dificulta descobrir e-mails cadastrados).
    private final String hashFalso;

    public AuthService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder, JwtService jwtService, PacienteService pacienteService) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.pacienteService = pacienteService;
        this.hashFalso = passwordEncoder.encode("senha-falsa-para-igualar-tempo");
    }

    public LoginResponseDTO login(LoginDTO dto) {
        String email = Textos.normalizarEmail(dto.getEmail());

        Usuario usuario = usuarioRepository.findByEmailIgnoreCase(email).orElse(null);
        String hash = (usuario != null && usuario.getSenha() != null) ? usuario.getSenha() : hashFalso;
        boolean senhaConfere = passwordEncoder.matches(dto.getSenha(), hash);

        if (usuario == null || !senhaConfere) {
            throw new CredenciaisInvalidasException();
        }
        return montarResposta(usuario);
    }

    public LoginResponseDTO registrarPaciente(UsuarioDTO dto) {
        return montarResposta(pacienteService.cadastrar(dto));
    }

    private LoginResponseDTO montarResposta(Usuario usuario) {
        Cargo cargo = resolverCargo(usuario);
        String token = jwtService.gerarToken(usuario.getId(), usuario.getEmail(), cargo);
        return new LoginResponseDTO(token, "Bearer", jwtService.getExpiracaoSegundos(),
                usuario.getId(), usuario.getNome(), usuario.getEmail(), cargo);
    }

    private Cargo resolverCargo(Usuario usuario) {
        if (usuario.getCargo() != null) return usuario.getCargo();
        if (usuario instanceof Administrador) return Cargo.ADMIN;
        if (usuario instanceof Profissional) return Cargo.PROFISSIONAL;
        if (usuario instanceof Paciente) return Cargo.PACIENTE;
        throw new CredenciaisInvalidasException();
    }
}
