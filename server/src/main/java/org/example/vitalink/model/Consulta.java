package org.example.vitalink.model;

import java.time.LocalDateTime;
import jakarta.persistence.*;

@Entity
public class Consulta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime inicio;

    private LocalDateTime fim;

    private String observacoes;

    @ManyToOne
    private Paciente paciente;

    @ManyToOne
    private Profissional profissional;
}