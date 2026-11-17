package br.com.vitalink.controller;

import jakarta.validation.Valid;
import br.com.vitalink.dto.request.MedicoDTO;
import br.com.vitalink.dto.response.MedicoListDTO;
import br.com.vitalink.dto.response.MedicoResponseDTO;
import br.com.vitalink.model.Medico;
import br.com.vitalink.service.MedicoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/medicos")
public class MedicoController {

    private final MedicoService medicoService;

    public MedicoController (MedicoService medicoService) {
        this.medicoService = medicoService;
    }

    @PostMapping
    public ResponseEntity<MedicoResponseDTO> cadastrar(@Valid @RequestBody MedicoDTO dto) {

        return ResponseEntity.status(HttpStatus.CREATED).body(new MedicoResponseDTO(medicoService.cadastrar(dto)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Medico> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(medicoService.buscarPorId(id)
        );
    }

    @GetMapping("/lista/todos")
    public ResponseEntity<List<MedicoListDTO>> listarTodos() {
        return ResponseEntity.ok(medicoService.listarTodosFormatado());
		  
    }

    @GetMapping("/lista/especialidade/{id}")
    public ResponseEntity<List<MedicoListDTO>> listarPorEspecialidade(@PathVariable Long id) {
        return ResponseEntity.ok(medicoService.listarPorEspecialidade(id));
    }

    @GetMapping("/especialidade/{id}")
    public ResponseEntity<List<Medico>> buscarPorEspecialidade(@PathVariable Long id) {
        return ResponseEntity.ok(medicoService.buscarPorEspecialidade(id)
        );
    }
}
