package org.example.vitalink.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ConsultaResponseDTO {

    private Long id;
    private Long medicoId;
    private String nomeMedico;
    private String especialidadeMedico;
    private Long pacienteId;
    private String nomePaciente;
    private LocalDateTime dataHora;
    private String status;
}