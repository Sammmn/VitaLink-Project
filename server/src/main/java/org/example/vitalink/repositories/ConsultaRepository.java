package org.example.vitalink.repositories;

import org.example.vitalink.model.Consulta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ConsultaRepository extends JpaRepository<Consulta, Long> {

    List<Consulta> findByPacienteId(Long pacienteId);

    boolean existsByMedicoIdAndDataHora(Long medicoId, LocalDateTime dataHora);

    boolean existsByPacienteIdAndDataHora(Long pacienteId, LocalDateTime dataHora);
}