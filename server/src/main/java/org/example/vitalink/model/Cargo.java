package org.example.vitalink.model;

import lombok.Getter;

@Getter
public enum Cargo {

    ADMIN("ADMIN"),
    RECEPCIONISTA("RECEPCIONISTA"),
    PROFISSIONAL("PROFISSIONAL"),
    PACIENTE("PACIENTE");

    private final String cargo;

    Cargo(String cargo) {
        this.cargo = cargo;
    }
}
