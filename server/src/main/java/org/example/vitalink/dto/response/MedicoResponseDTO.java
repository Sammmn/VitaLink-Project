package org.example.vitalink.dto.response;

import lombok.Getter;
import lombok.Setter;
import org.example.vitalink.model.Medico;

import java.util.List;

@Getter
@Setter
public class MedicoResponseDTO extends ProfissionalResponseDTO {

    private List<EspecialidadeResponseDTO> especialidades;

    public MedicoResponseDTO(Medico medico) {
        super(medico);
        this.especialidades = medico.getEspecialidades().stream().map(EspecialidadeResponseDTO::new).toList();
    }
}
