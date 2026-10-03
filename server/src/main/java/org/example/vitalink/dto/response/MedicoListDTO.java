package org.example.vitalink.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.vitalink.model.Medico;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MedicoListDTO {

    private Long id;
    private String nome;
    private String email;
    private String telefone;
    private String registroProfissional;
    private Double valorConsulta;
    private String biografia;
    private Double avaliacao;
    private String localizacao;
    private List<String> especialidades;

    public MedicoListDTO(Medico medico) {
        this.id = medico.getId();
        this.nome = medico.getNome();
        this.email = medico.getEmail();
        this.telefone = medico.getTelefone();
        this.registroProfissional = medico.getRegistroProfissional();
        this.valorConsulta = medico.getValorConsulta();
        this.biografia = medico.getBiografia();
        this.avaliacao = medico.getAvaliacao() != null ? medico.getAvaliacao() : 4.5;
        this.localizacao = medico.getLocalizacao() != null ? medico.getLocalizacao() : "São Paulo, SP";
        this.especialidades = medico.getEspecialidades().stream()
                .map(e -> e.getNome())
                .collect(Collectors.toList());
    }
}
