package br.com.vitalink.dto.response;

import lombok.Getter;
import lombok.Setter;
import br.com.vitalink.model.Profissional;

import java.math.BigDecimal;

@Getter
@Setter
public abstract class ProfissionalResponseDTO extends UsuarioResponseDTO {

    private String registroProfissional;
    private String biografia;
    private BigDecimal valorConsulta;

    public ProfissionalResponseDTO(Profissional profissional) {
        super(profissional);

        this.registroProfissional = profissional.getRegistroProfissional();
        this.biografia = profissional.getBiografia();
        this.valorConsulta = profissional.getValorConsulta();
    }
}
