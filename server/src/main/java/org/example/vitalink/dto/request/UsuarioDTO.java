package org.example.vitalink.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsuarioDTO {

    private String nome;
    private String cpf;
    private String email;
    private String senha;
    private String telefone;
}
