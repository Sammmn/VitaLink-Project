package org.example.vitalink.repositories;

import org.example.vitalink.model.Agenda;
import org.example.vitalink.model.Medico;
import org.example.vitalink.model.Profissional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface AgendaRepository extends JpaRepository<Agenda, Long> {

    List<Agenda> findByProfissionalAndData(Profissional profissional, Date data);

    List<Agenda> findByMedicoEData(Long medicoId, LocalDate data);

    List<Agenda> findByFisioEData(Long fisioId, LocalDate data);

    List<Agenda> findByPsicoEData(Long psicoId, LocalDate data);
}
