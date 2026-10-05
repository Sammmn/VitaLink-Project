package org.example.vitalink.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HorarioDisponivelDTO {

    private String horario;
    private Boolean disponivel;

    public HorarioDisponivelDTO(LocalTime horario, Boolean disponivel) {
        this.horario = horario.toString();
        this.disponivel = disponivel;
    }
}
