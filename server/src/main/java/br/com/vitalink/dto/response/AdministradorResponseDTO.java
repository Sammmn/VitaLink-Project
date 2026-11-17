package br.com.vitalink.dto.response;


import lombok.Getter;
import lombok.Setter;
import br.com.vitalink.model.Administrador;

@Getter
@Setter
public class AdministradorResponseDTO extends UsuarioResponseDTO{

   private String nivelAcesso;

   public AdministradorResponseDTO(Administrador administrador) {
      super(administrador);
      this.nivelAcesso = administrador.getNivelAcesso();
   }
}
