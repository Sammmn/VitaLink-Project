package br.com.vitalink.repositories;

import br.com.vitalink.model.Consulta;
import br.com.vitalink.model.StatusConsulta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ConsultaRepository extends JpaRepository<Consulta,Long> {

    @Query("""
        SELECT c FROM Consulta c
        WHERE c.profissional.id = :profissionalId
        AND c.inicio BETWEEN :inicio AND :fim
        ORDER BY c.fim ASC
    """)
    List<Consulta> buscarAgendaPorProfissionalEPeriodo(
            @Param("profissionalId") Long profissionalId,
            @Param("inicio") LocalDateTime inicio,
            @Param("fim") LocalDateTime fim
    );

    boolean existsByProfissionalIdAndInicioAndStatusNot(Long profissionalId, LocalDateTime inicio, StatusConsulta status);

    boolean existsByPacienteIdAndInicioAndStatusNot(Long pacienteId, LocalDateTime inicio, StatusConsulta status);

    List<Consulta> findByPacienteIdOrderByInicioDesc(Long pacienteId);

    List<Consulta> findByProfissionalIdOrderByInicioDesc(Long profissionalId);

    List<Consulta> findAllByOrderByInicioDesc();
}
