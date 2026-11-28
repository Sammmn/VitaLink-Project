package br.com.vitalink.service;

import br.com.vitalink.dto.request.ConsultaRequestDTO;
import br.com.vitalink.dto.request.RegistroAtendimentoDTO;
import br.com.vitalink.dto.response.ConsultaResponseDTO;
import br.com.vitalink.exception.ConflitoException;
import br.com.vitalink.exception.RecursoNaoEncontradoException;
import br.com.vitalink.exception.RegraNegocioException;
import br.com.vitalink.model.Agenda;
import br.com.vitalink.model.Cargo;
import br.com.vitalink.model.Consulta;
import br.com.vitalink.model.Paciente;
import br.com.vitalink.model.StatusConsulta;
import br.com.vitalink.repositories.AgendaRepository;
import br.com.vitalink.repositories.ConsultaRepository;
import br.com.vitalink.repositories.PacienteRepository;
import br.com.vitalink.repositories.ProfissionalRepository;
import br.com.vitalink.security.UsuarioAutenticado;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ConsultaService {

    private final ConsultaRepository consultaRepository;
    private final AgendaRepository agendaRepository;
    private final PacienteRepository pacienteRepository;
    private final ProfissionalRepository profissionalRepository;

    public ConsultaService(ConsultaRepository consultaRepository,
                           AgendaRepository agendaRepository,
                           PacienteRepository pacienteRepository,
                           ProfissionalRepository profissionalRepository) {
        this.consultaRepository = consultaRepository;
        this.agendaRepository = agendaRepository;
        this.pacienteRepository = pacienteRepository;
        this.profissionalRepository = profissionalRepository;
    }

    @Transactional
    public ConsultaResponseDTO agendarConsulta(ConsultaRequestDTO dto, Long pacienteId) {
        LocalDateTime inicio = LocalDateTime.of(dto.getData(), dto.getHorario());

        if (inicio.isBefore(LocalDateTime.now())) {
            throw new RegraNegocioException("Não é possível agendar uma consulta para uma data ou horário no passado.");
        }

        if (!profissionalRepository.existsById(dto.getProfissionalId())) {
            throw new RecursoNaoEncontradoException("Profissional não encontrado com o ID: " + dto.getProfissionalId());
        }

        Paciente paciente = pacienteRepository.findById(pacienteId)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Paciente não encontrado com o ID: " + pacienteId));

        Agenda agenda = agendaRepository
                .findByProfissionalIdAndDataAndHorario(dto.getProfissionalId(), dto.getData(), dto.getHorario())
                .orElseThrow(() -> new RecursoNaoEncontradoException("Horário não encontrado na agenda deste profissional."));

        if (!agenda.isDisponivel()) {
            throw new ConflitoException("Este horário não está mais disponível.");
        }

        if (consultaRepository.existsByProfissionalIdAndInicioAndStatusNot(dto.getProfissionalId(), inicio, StatusConsulta.CANCELADA)) {
            throw new ConflitoException("O profissional já possui uma consulta agendada neste horário.");
        }

        if (consultaRepository.existsByPacienteIdAndInicioAndStatusNot(pacienteId, inicio, StatusConsulta.CANCELADA)) {
            throw new ConflitoException("Você já possui uma consulta agendada neste mesmo horário.");
        }

        agenda.setDisponivel(false);
        agendaRepository.save(agenda);

        Consulta consulta = new Consulta();
        consulta.setPaciente(paciente);
        consulta.setProfissional(agenda.getProfissional());
        consulta.setInicio(inicio);
        consulta.setFim(inicio.plusMinutes(30));
        consulta.setStatus(StatusConsulta.AGENDADA);

        Consulta consultaSalva = consultaRepository.save(consulta);
        return new ConsultaResponseDTO(consultaSalva);
    }

    @Transactional(readOnly = true)
    public List<ConsultaResponseDTO> consultarHistorico(UsuarioAutenticado usuario) {
        List<Consulta> consultas;

        if (usuario.cargo() == Cargo.PACIENTE) {
            if (!pacienteRepository.existsById(usuario.id())) {
                throw new RecursoNaoEncontradoException("Paciente não encontrado");
            }
            consultas = consultaRepository.findByPacienteIdOrderByInicioDesc(usuario.id());
        } else if (usuario.cargo() == Cargo.PROFISSIONAL) {
            if (!profissionalRepository.existsById(usuario.id())) {
                throw new RecursoNaoEncontradoException("Profissional não encontrado");
            }
            consultas = consultaRepository.findByProfissionalIdOrderByInicioDesc(usuario.id());
        } else {
            consultas = consultaRepository.findAllByOrderByInicioDesc();
        }

        return consultas.stream()
                .map(ConsultaResponseDTO::new)
                .collect(Collectors.toList());
    }

    // RF10: Buscar agenda do médico/profissional em uma data
    public List<ConsultaResponseDTO> obterAgendaProfissional(Long profissionalId, LocalDate data) {
        LocalDate dataConsulta = (data != null) ? data : LocalDate.now();
        LocalDateTime inicio = dataConsulta.atStartOfDay();
        LocalDateTime fim = dataConsulta.atTime(LocalTime.MAX);

        return consultaRepository.buscarAgendaPorProfissionalEPeriodo(profissionalId, inicio, fim)
                .stream()
                .map(ConsultaResponseDTO::new)
                .collect(Collectors.toList());
    }

    // RF11: Marcar consulta como "realizada" e registrar atendimento clínico
    @Transactional
    public ConsultaResponseDTO marcarComoRealizada(Long consultaId, Long profissionalId, RegistroAtendimentoDTO dados) {
        Consulta consulta = consultaRepository.findById(consultaId)
                .orElseThrow(() -> new RuntimeException("Consulta não encontrada com o ID: " + consultaId));

        if (!consulta.getProfissional().getId().equals(profissionalId)) {
            throw new RuntimeException("Acesso negado: o profissional não é o responsável por esta consulta.");
        }

        if (consulta.getStatus() == StatusConsulta.CANCELADA) {
            throw new RuntimeException("Não é possível realizar uma consulta que foi cancelada.");
        }

        if (consulta.getStatus() == StatusConsulta.REALIZADA) {
            throw new RuntimeException("Esta consulta já foi finalizada anteriormente.");
        }

        consulta.setStatus(StatusConsulta.REALIZADA);
        consulta.setDiagnostico(dados.getDiagnostico());
        consulta.setPrescricao(dados.getPrescricao());
        consulta.setObservacoes(dados.getObservacoes());

        return new ConsultaResponseDTO(consultaRepository.save(consulta));
    }
}