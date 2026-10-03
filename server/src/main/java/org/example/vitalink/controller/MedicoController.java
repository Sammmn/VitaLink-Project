package org.example.vitalink.controller;

import org.example.vitalink.dto.request.LoginDTO;
import org.example.vitalink.dto.request.MedicoDTO;
import org.example.vitalink.dto.response.MedicoResponseDTO;
import org.example.vitalink.model.Medico;
import org.example.vitalink.service.MedicoService;
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
    public ResponseEntity<Medico> cadastrar(@RequestBody MedicoDTO dto) {

        return ResponseEntity.status(HttpStatus.CREATED).body(medicoService.cadastrar(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Medico> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(medicoService.buscarPorId(id)
        );
    }

    @GetMapping
    public ResponseEntity<List<Medico>> listarTodos() {
        return ResponseEntity.ok(medicoService.listarTodos()
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

    @PostMapping("/login")
    public ResponseEntity<MedicoResponseDTO> login(
            @RequestBody LoginDTO dto) {Medico medico = medicoService.login(dto);
        return ResponseEntity.ok(new MedicoResponseDTO(medico));
    }
}
