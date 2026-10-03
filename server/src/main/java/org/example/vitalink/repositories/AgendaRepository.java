package org.example.vitalink.repositories;

import org.example.vitalink.model.Agenda;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AgendaRepository extends JpaRepository<Agenda, Long> {

    List<Agenda> findByProfissionalIdAndDataAndDisponivelTrue(Long profissionalId, LocalDate data);

}