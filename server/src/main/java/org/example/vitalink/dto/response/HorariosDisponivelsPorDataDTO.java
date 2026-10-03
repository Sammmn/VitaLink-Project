package org.example.vitalink.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HorariosDisponivelsPorDataDTO {

    private LocalDate data;
    private List<HorarioDisponibleDTO> horarios;

    public HorariosDisponivelsPorDataDTO(LocalDate data, List<HorarioDisponibleDTO> horarios) {
        this.data = data;
        this.horarios = horarios;
    }
}