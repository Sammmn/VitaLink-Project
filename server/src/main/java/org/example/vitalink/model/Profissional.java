package org.example.vitalink.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
public abstract class Profissional extends Usuario {

    @Column(unique = true)
    private String registroProfissional;

    private String biografia;

    private BigDecimal valorConsulta;
}
