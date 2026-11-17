package br.com.vitalink.model;

import jakarta.persistence.Entity;

@Entity
public class Paciente extends Usuario{

    public Paciente(){
        setCargo(Cargo.PACIENTE);
    }

}
