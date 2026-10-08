package org.example.vitalink.dto.response;


import lombok.Getter;
import lombok.Setter;
import org.example.vitalink.model.Usuario;

@Getter
@Setter
public class UsuarioResponseDTO {

    private Long id;
    private String nome;
    private String email;
    private String telefone;

    public UsuarioResponseDTO(Usuario usuario) {
        this.id = usuario.getId();
        this.nome = usuario.getNome();
        this.email = usuario.getEmail();
        this.telefone = usuario.getTelefone();
    }
}
