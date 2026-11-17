
package br.com.vitalink.dto.request;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class PsicologoDTO {

    @NotBlank(message = "Nome é obrigatório")
    private String nome;

    private String cpf;

    @NotBlank(message = "E-mail é obrigatório")
    @Email(message = "E-mail inválido")
    private String email;

    @NotBlank(message = "Senha é obrigatória")
    @Size(min = 8, max = 72,
            message = "A senha deve ter entre 8 e 72 caracteres")
    private String senha;

    private String telefone;

    @NotBlank(message = "Registro profissional é obrigatório")
    private String registroProfissional;

    private String biografia;

    @NotNull(message = "Valor da consulta é obrigatório")
    @DecimalMin(value = "0.01",
            message = "O valor da consulta deve ser maior que zero")
    private BigDecimal valorConsulta;

    private String localizacao;

    private String abordagem;
}
