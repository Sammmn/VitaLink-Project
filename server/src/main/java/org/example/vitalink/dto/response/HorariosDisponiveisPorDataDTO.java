package org.example.vitalink.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class HorariosDisponiveisPorDataDTO {

    private LocalDate data;
    private List<HorarioDisponivelDTO> horarios;

    public HorariosDisponiveisPorDataDTO(LocalDate data, List<HorarioDisponivelDTO> horarios) {
        this.data = data;
        this.horarios = horarios;
    }
}