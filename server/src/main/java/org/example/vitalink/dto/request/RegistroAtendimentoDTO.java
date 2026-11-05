package org.example.vitalink.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegistroAtendimentoDTO {

    @NotBlank(message = "O diagnóstico é obrigatório.")
    private String diagnostico;

    private String prescricao;
    private String observacoes;
}