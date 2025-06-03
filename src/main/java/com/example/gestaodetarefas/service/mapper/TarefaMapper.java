package com.example.gestaodetarefas.service.mapper;

import com.example.gestaodetarefas.dto.TarefaResponse;
import com.example.gestaodetarefas.model.Tarefa;
import com.example.gestaodetarefas.model.Usuario;
import org.springframework.stereotype.Component;

@Component
public class TarefaMapper {
    
    public TarefaResponse toResponse(Tarefa tarefa) {
        if (tarefa == null) {
            return null;
        }
        
        Usuario usuario = tarefa.getUsuario();
        
        return new TarefaResponse(
            tarefa.getId(),
            tarefa.getTitulo(),
            tarefa.getDescricao(),
            tarefa.getStatusTarefa(),
            usuario != null ? usuario.getId() : null,
            usuario != null ? usuario.getNome() : null
        );
    }
}
