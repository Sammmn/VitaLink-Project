package br.com.vitalink.dto.response;

import br.com.vitalink.model.Cargo;

public record LoginResponseDTO(
        String token,
        String tipo,
        long expiraEmSegundos,
        Long id,
        String nome,
        String email,
        Cargo cargo
) {
}
