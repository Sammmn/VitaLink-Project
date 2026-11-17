package br.com.vitalink.dto.response;

import br.com.vitalink.model.Psicologo;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
public class PsicologoResponseDTO {

    private final Long id;
    private final String nome;
    private final String email;
    private final String telefone;
    private final String registroProfissional;
    private final String biografia;
    private final BigDecimal valorConsulta;
    private final Double avaliacao;
    private final String localizacao;
    private final String abordagem;

    public PsicologoResponseDTO(Psicologo psicologo) {
        this.id = psicologo.getId();
        this.nome = psicologo.getNome();
        this.email = psicologo.getEmail();
        this.telefone = psicologo.getTelefone();
        this.registroProfissional =
                psicologo.getRegistroProfissional();
        this.biografia = psicologo.getBiografia();
        this.valorConsulta = psicologo.getValorConsulta();
        this.avaliacao = psicologo.getAvaliacao();
        this.localizacao = psicologo.getLocalizacao();
        this.abordagem = psicologo.getAbordagem();
    }
}
