package org.example.vitalink.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.autoconfigure.kafka.KafkaProperties;
import org.springframework.web.bind.annotation.GetMapping;

@Getter
@Setter
@Entity
public class Administrador extends Usuario {

    private String nivelAcesso;

    public Administrador(){
        setCargo(Cargo.ADMIN);
    }
}
