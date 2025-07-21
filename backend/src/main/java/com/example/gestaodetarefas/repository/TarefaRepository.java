package com.example.gestaodetarefas.repository;

import com.example.gestaodetarefas.model.Tarefa;
import com.example.gestaodetarefas.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository//informa que faz parte da camada de persistência(camada de acesso a dados)
public interface TarefaRepository extends JpaRepository<Tarefa, Long> {//essa herança permite acesso a métodos prontos como save(), delete(), findAll() etc
    Boolean existsByTitulo(String tituloTarefa);//consulta gerada a partir do nome da tarefa
    List<Tarefa> findByUsuario(Usuario usuario);
    Optional<Tarefa> findByIdAndUsuario(Long id, Usuario usuario);
}
