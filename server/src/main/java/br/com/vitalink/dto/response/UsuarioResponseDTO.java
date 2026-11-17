package br.com.vitalink.dto.response;


import lombok.Getter;
import lombok.Setter;
import br.com.vitalink.model.Cargo;
import br.com.vitalink.model.Usuario;

@Getter
@Setter
public class UsuarioResponseDTO {

    private Long id;
    private String nome;
    private String cpf;
    private String email;
    private String telefone;
    private Cargo cargo;

    public UsuarioResponseDTO(Usuario usuario) {
        this.id = usuario.getId();
        this.nome = usuario.getNome();
        this.cpf = usuario.getCpf();
        this.email = usuario.getEmail();
        this.telefone = usuario.getTelefone();
        this.cargo = usuario.getCargo();
    }
}
