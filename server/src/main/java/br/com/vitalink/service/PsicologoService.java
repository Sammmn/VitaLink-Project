package br.com.vitalink.service;

import br.com.vitalink.dto.request.PsicologoDTO;
import br.com.vitalink.exception.ConflitoException;
import br.com.vitalink.model.Cargo;
import br.com.vitalink.model.Psicologo;
import br.com.vitalink.repositories.PsicologoRepository;
import br.com.vitalink.repositories.ProfissionalRepository;
import br.com.vitalink.repositories.UsuarioRepository;
import br.com.vitalink.util.Textos;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class PsicologoService {

    private final PsicologoRepository psicologoRepository;
    private final UsuarioRepository usuarioRepository;
    private final ProfissionalRepository profissionalRepository;
    private final PasswordEncoder passwordEncoder;

    public PsicologoService(
            PsicologoRepository psicologoRepository,
            UsuarioRepository usuarioRepository,
            ProfissionalRepository profissionalRepository,
            PasswordEncoder passwordEncoder) {

        this.psicologoRepository = psicologoRepository;
        this.usuarioRepository = usuarioRepository;
        this.profissionalRepository = profissionalRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Psicologo cadastrar(PsicologoDTO dto) {

        String email = Textos.normalizarEmail(dto.getEmail());
        String cpf = Textos.textoOuNull(dto.getCpf());
        String registro = Textos.textoOuNull(
                dto.getRegistroProfissional()
        );

        if (usuarioRepository.existsByEmailIgnoreCase(email)) {
            throw new ConflitoException("Email já cadastrado.");
        }

        if (cpf != null && usuarioRepository.existsByCpf(cpf)) {
            throw new ConflitoException("CPF já cadastrado.");
        }

        if (profissionalRepository.existsByRegistroProfissional(registro)) {
            throw new ConflitoException(
                    "Registro profissional já cadastrado."
            );
        }

        Psicologo psicologo = new Psicologo();

        psicologo.setNome(dto.getNome().trim());
        psicologo.setCpf(cpf);
        psicologo.setEmail(email);
        psicologo.setSenha(passwordEncoder.encode(dto.getSenha()));
        psicologo.setTelefone(Textos.textoOuNull(dto.getTelefone()));

        psicologo.setRegistroProfissional(registro);
        psicologo.setBiografia(dto.getBiografia());
        psicologo.setValorConsulta(dto.getValorConsulta());
        psicologo.setLocalizacao(dto.getLocalizacao());
        psicologo.setAbordagem(dto.getAbordagem());

        psicologo.setCargo(Cargo.PROFISSIONAL);

        return psicologoRepository.save(psicologo);
    }
}
