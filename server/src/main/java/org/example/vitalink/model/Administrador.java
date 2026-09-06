package org.example.vitalink.model;

import jakarta.persistence.Entity;

@Entity
public class Administrador extends Usuario {

    private String nivelAcesso;
}
