package com.example.gestaodetarefas.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TarefaResponse {
    private Long id;
    private String titulo;
    private String descricao;
    private String status;
    private Long usuarioId;  // Apenas o ID do usuário, não o objeto inteiro
    private String nomeUsuario;  // Nome do usuário, se necessário
}
