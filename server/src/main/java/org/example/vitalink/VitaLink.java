package org.example.vitalink;

import org.example.vitalink.model.Administrador;
import org.example.vitalink.model.Cargo;
import org.example.vitalink.model.Usuario;
import org.example.vitalink.repositories.AdministradorRepository;
import org.example.vitalink.service.AdministradorService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class VitaLink {

    public static void main(String[] args) {

        SpringApplication.run(VitaLink.class, args);
    }

}
