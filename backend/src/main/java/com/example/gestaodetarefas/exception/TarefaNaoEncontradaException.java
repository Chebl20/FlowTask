package com.example.gestaodetarefas.exception;

public class TarefaNaoEncontradaException extends RuntimeException {
    public TarefaNaoEncontradaException(String message) {
        super(message);
    }
}
