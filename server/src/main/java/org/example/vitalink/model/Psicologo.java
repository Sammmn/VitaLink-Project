package org.example.vitalink.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Psicologo extends Profissional {

    private String abordagem;

    public Psicologo(){
        setCargo(Cargo.PROFISSIONAL);
    }
}
