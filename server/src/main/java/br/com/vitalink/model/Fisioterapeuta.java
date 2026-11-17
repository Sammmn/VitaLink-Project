package br.com.vitalink.model;

import jakarta.persistence.Entity;

@Entity
public class Fisioterapeuta extends Profissional{
    private String area;

    public Fisioterapeuta(){
        setCargo(Cargo.PROFISSIONAL);
    }
}
