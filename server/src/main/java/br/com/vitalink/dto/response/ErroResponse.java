package br.com.vitalink.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.time.Instant;
import java.util.Map;

/** Formato único de erro devolvido pela API (inclusive 401 e 403). */
@JsonInclude(JsonInclude.Include.NON_NULL)
public record ErroResponse(
        Instant timestamp,
        int status,
        String erro,
        String mensagem,
        Map<String, String> campos
) {
    public static ErroResponse of(int status, String erro, String mensagem) {
        return new ErroResponse(Instant.now(), status, erro, mensagem, null);
    }
}
