package com.example.gestaodetarefas.service;

import com.example.gestaodetarefas.exception.ResourceNotFoundException;
import com.example.gestaodetarefas.model.Tarefa;
import com.example.gestaodetarefas.model.Usuario;
import com.example.gestaodetarefas.repository.TarefaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TarefaService {

    static final Logger logger = LoggerFactory.getLogger(TarefaService.class);

    @Autowired
    private TarefaRepository tarefaRepository;

    public Tarefa salvarTarefa(Tarefa tarefa) {
        return tarefaRepository.save(tarefa);
    }

    public List<Tarefa> listarTarefas(Usuario usuario) {
        return tarefaRepository.findByUsuario(usuario);
    }

    public Tarefa buscarTarefa(Long id, Usuario usuario){
        Tarefa tarefa = tarefaRepository.findByIdAndUsuario(id, usuario).orElseThrow(() -> new ResourceNotFoundException("Tarefa não encontrada"));
        return tarefa;
    }

    public Tarefa atualizarTarefa(Long id, Tarefa tarefaAtualizada, Usuario usuario) {
        Tarefa tarefa = buscarTarefa(id, usuario);
        
        // Atualiza apenas os campos que foram fornecidos na requisição
        if (tarefaAtualizada.getTitulo() != null) {
            tarefa.setTitulo(tarefaAtualizada.getTitulo());
        }
        if (tarefaAtualizada.getDescricao() != null) {
            tarefa.setDescricao(tarefaAtualizada.getDescricao());
        }
        if (tarefaAtualizada.getStatusTarefa() != null) {
            tarefa.setStatusTarefa(tarefaAtualizada.getStatusTarefa());
        }
        
        return tarefaRepository.save(tarefa);
    }

    public void deletarTarefa(Long id, Usuario usuario){
        Tarefa tarefa = buscarTarefa(id, usuario);
        tarefaRepository.delete(tarefa);
        logger.info("Tarefa deletada com sucesso");
    }

}
