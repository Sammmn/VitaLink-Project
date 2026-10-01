package org.example.vitalink.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public abstract class ProfissionalDTO extends UsuarioDTO {

    private String registroProfissional;
    private String biografia;
    private BigDecimal valorConsulta;
}