package br.com.vitalink.exception;

public class CredenciaisInvalidasException extends RuntimeException {

    public CredenciaisInvalidasException() {
        super("E-mail ou senha inválidos.");
    }

    public CredenciaisInvalidasException(String mensagem) {
        super(mensagem);
    }
}
