package org.example.vitalink.dto.response;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsuarioResponseDTO {

    private Long id;
    private String nome;
    private String cpf;
    private String email;
    private String telefone;
}
