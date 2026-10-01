package org.example.vitalink.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public abstract class ProfissionalResponseDTO extends UsuarioResponseDTO {

    private String registroProfissional;
    private String biografia;
    private BigDecimal valorConsulta;
}
