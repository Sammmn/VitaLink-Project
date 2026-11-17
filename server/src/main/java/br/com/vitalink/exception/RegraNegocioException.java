package br.com.vitalink.exception;

public class RegraNegocioException extends RuntimeException {

    public RegraNegocioException() {
        super("Requisição inválida.");
    }

    public RegraNegocioException(String mensagem) {
        super(mensagem);
    }
}
