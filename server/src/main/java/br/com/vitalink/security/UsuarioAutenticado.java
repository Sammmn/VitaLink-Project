package br.com.vitalink.security;

import br.com.vitalink.model.Cargo;

/** Dados do usuário extraídos do JWT; é o "principal" do Spring Security. */
public record UsuarioAutenticado(Long id, String email, Cargo cargo) {
}
