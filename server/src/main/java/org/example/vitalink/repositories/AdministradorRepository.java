package org.example.vitalink.repositories;

import org.example.vitalink.model.Administrador;
import org.example.vitalink.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdministradorRepository extends JpaRepository<Usuario, Long> {

    Optional<Administrador> findByEmail(String email);

    boolean existsByEmail(String email);

    boolean existsByCpf(String cpf);
}
