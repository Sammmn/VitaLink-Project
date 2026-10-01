package org.example.vitalink.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class MedicoResponseDTO extends ProfissionalResponseDTO {

    private List<EspecialidadeResponseDTO> especialidades;
}
