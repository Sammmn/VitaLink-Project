package br.com.vitalink.repositories;

import br.com.vitalink.model.Agenda;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface AgendaRepository extends JpaRepository<Agenda, Long> {

    List<Agenda> findByProfissionalIdAndData(Long profissionalId, LocalDate data);

}
