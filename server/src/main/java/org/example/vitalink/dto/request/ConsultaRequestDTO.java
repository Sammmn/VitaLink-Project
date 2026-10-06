package org.example.vitalink.dto.request;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ConsultaRequestDTO {

    @NotNull
    private Long medicoId;

    @NotNull
    @Future
    private LocalDateTime dataHora;
}

