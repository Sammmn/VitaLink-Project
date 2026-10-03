package org.example.vitalink.model;

import jakarta.persistence.*;

@Entity
@Table (name = "interacoes")
public class Interacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idDaInteracao;
    private String nomeDaInteracao;
    private String localDaInteracao;     // a consulta vai ser na sala 204 por exemplo
    private String data;
}
