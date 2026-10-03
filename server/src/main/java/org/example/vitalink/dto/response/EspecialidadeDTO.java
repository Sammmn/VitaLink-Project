package org.example.vitalink.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.vitalink.model.Especialidade;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EspecialidadeDTO {

    private Long id;
    private String nome;
    private Integer totalMedicos;

    public EspecialidadeDTO(Especialidade especialidade) {
        this.id = especialidade.getId();
        this.nome = especialidade.getNome();
    }

    public EspecialidadeDTO(Especialidade especialidade, Integer totalMedicos) {
        this.id = especialidade.getId();
        this.nome = especialidade.getNome();
        this.totalMedicos = totalMedicos;
    }
}
