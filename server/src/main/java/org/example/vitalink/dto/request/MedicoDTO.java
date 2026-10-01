package org.example.vitalink.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class MedicoDTO extends ProfissionalDTO {

    private List<Long> especialidades;
}