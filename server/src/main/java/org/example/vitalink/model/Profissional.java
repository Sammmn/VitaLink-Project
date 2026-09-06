package org.example.vitalink.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;

@Entity
public abstract class Profissional extends Usuario {

    @Column(unique = true)
    private String registroProfissional;

    private String biografia;

    private Double valorConsulta;
}
