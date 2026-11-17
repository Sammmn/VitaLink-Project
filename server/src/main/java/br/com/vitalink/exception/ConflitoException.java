package br.com.vitalink.exception;

public class ConflitoException extends RuntimeException {

    public ConflitoException() {
        super("Conflito de dados.");
    }

    public ConflitoException(String mensagem) {
        super(mensagem);
    }
}
