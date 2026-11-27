package br.com.vitalink.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
public class ConsultaRequestDTO {

    @NotNull(message = "O ID do profissional é obrigatório.")
    private Long profissionalId;

    @NotNull(message = "A data da consulta é obrigatória.")
    private LocalDate data;

    @NotNull(message = "O horário da consulta é obrigatório.")
    private LocalTime horario;
}