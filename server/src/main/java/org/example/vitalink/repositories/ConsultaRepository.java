package org.example.vitalink.repositories;

import org.example.vitalink.model.Consulta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ConsultaRepository extends JpaRepository<Consulta, Long> {

    @Query("""
        SELECT c FROM Consulta c
        WHERE c.profissional.id = :profissionalId
          AND c.inicio >= :inicio
          AND c.inicio <= :fim
        ORDER BY c.inicio ASC
    """)
    List<Consulta> buscarAgendaPorProfissionalEPeriodo(
        @Param("profissionalId") Long profissionalId,
        @Param("inicio") LocalDateTime inicio,
        @Param("fim") LocalDateTime fim
    );
}