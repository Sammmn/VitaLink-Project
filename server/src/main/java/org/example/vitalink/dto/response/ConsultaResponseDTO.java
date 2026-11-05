package org.example.vitalink.dto.response;

import lombok.Getter;
import lombok.Setter;
import org.example.vitalink.model.Consulta;
import org.example.vitalink.model.StatusConsulta;

import java.time.LocalDateTime;

@Getter
@Setter
public class ConsultaResponseDTO {

    private Long id;
    private Long profissionalId;
    private String profissionalNome;
    private Long pacienteId;
    private String pacienteNome;
    private LocalDateTime inicio;
    private LocalDateTime fim;
    private StatusConsulta status;
    private String diagnostico;
    private String prescricao;
    private String observacoes;

    public ConsultaResponseDTO(Consulta consulta) {
        this.id = consulta.getId();
        this.profissionalId = (consulta.getProfissional() != null) ? consulta.getProfissional().getId() : null;
        this.profissionalNome = (consulta.getProfissional() != null) ? consulta.getProfissional().getNome() : null;
        this.pacienteId = (consulta.getPaciente() != null) ? consulta.getPaciente().getId() : null;
        this.pacienteNome = (consulta.getPaciente() != null) ? consulta.getPaciente().getNome() : null;
        this.inicio = consulta.getInicio();
        this.fim = consulta.getFim();
        this.status = consulta.getStatus();
        this.diagnostico = consulta.getDiagnostico();
        this.prescricao = consulta.getPrescricao();
        this.observacoes = consulta.getObservacoes();
    }
}