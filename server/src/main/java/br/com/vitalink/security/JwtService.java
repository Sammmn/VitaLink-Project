package br.com.vitalink.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import br.com.vitalink.model.Cargo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Optional;

@Service
public class JwtService {

    private static final String ISSUER = "vitalink";

    private final SecretKey chave;
    private final long expiracaoMs;

    public JwtService(@Value("${jwt.secret}") String segredo,
                      @Value("${jwt.expiration-ms:3600000}") long expiracaoMs) {
        byte[] bytes = segredo == null ? new byte[0] : segredo.getBytes(StandardCharsets.UTF_8);
        if (bytes.length < 32) {
            throw new IllegalStateException(
                    "jwt.secret (variável JWT_SECRET) precisa ter pelo menos 32 caracteres (256 bits).");
        }
        this.chave = Keys.hmacShaKeyFor(bytes);
        this.expiracaoMs = expiracaoMs;
    }

    public String gerarToken(Long id, String email, Cargo cargo) {
        long agora = System.currentTimeMillis();
        return Jwts.builder()
                .issuer(ISSUER)
                .subject(String.valueOf(id))
                .claim("email", email)
                .claim("cargo", cargo.name())
                .issuedAt(new Date(agora))
                .expiration(new Date(agora + expiracaoMs))
                .signWith(chave)
                .compact();
    }

    public long getExpiracaoSegundos() {
        return expiracaoMs / 1000;
    }

    /**
     * Valida assinatura, emissor e expiração. Qualquer problema (token adulterado,
     * expirado, sem assinatura, lixo) resulta em Optional vazio.
     */
    public Optional<UsuarioAutenticado> validar(String token) {
        if (token == null || token.isBlank()) {
            return Optional.empty();
        }
        try {
            Claims claims = Jwts.parser()
                    .verifyWith(chave)
                    .requireIssuer(ISSUER)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();

            return Optional.of(new UsuarioAutenticado(
                    Long.valueOf(claims.getSubject()),
                    claims.get("email", String.class),
                    Cargo.valueOf(claims.get("cargo", String.class))));
        } catch (JwtException | IllegalArgumentException | NullPointerException e) {
            return Optional.empty();
        }
    }
}
