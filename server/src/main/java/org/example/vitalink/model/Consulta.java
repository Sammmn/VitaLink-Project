package org.example.vitalink.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Consulta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime inicio;

    private LocalDateTime fim;

    @Enumerated(EnumType.STRING)
    private StatusConsulta status = StatusConsulta.AGENDADA;

    private String diagnostico;

    private String prescricao;

    @Column(columnDefinition = "TEXT")
    private String observacoes;

    @ManyToOne
    private Paciente paciente;

    @ManyToOne
    private Profissional profissional;
}