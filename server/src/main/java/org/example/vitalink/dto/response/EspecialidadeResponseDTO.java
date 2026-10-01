package org.example.vitalink.dto.response;

import lombok.Getter;
import lombok.Setter;
import org.example.vitalink.model.Especialidade;

@Getter
@Setter
public class EspecialidadeResponseDTO {

    private Long id;
    private String nome;

    public EspecialidadeResponseDTO(Especialidade especialidade) {
        this.id = especialidade.getId();
        this.nome = especialidade.getNome();
    }
}
