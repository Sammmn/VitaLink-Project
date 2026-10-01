package org.example.vitalink.repositories;

import org.example.vitalink.model.Medico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MedicoRepository extends JpaRepository <Medico, Long> {

    Optional<Medico> findByEmail(String email);

    boolean existsByEmail(String email);

    boolean existsByCpf(String cpf);

    List<Medico> findByEspecialidadesId(Long id);

    boolean existsByRegistroProfissional(String registroProfissional);
}
