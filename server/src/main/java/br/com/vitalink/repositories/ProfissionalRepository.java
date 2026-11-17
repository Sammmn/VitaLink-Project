package br.com.vitalink.repositories;

import br.com.vitalink.model.Profissional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfissionalRepository extends JpaRepository<Profissional, Long> {

    boolean existsByRegistroProfissional(String registroProfissional);
}