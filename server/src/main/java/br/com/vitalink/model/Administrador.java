package br.com.vitalink.model;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Administrador extends Usuario {

    private String nivelAcesso;

    public Administrador(){
        setCargo(Cargo.ADMIN);
    }
}
