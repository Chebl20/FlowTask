package com.example.gestaodetarefas.service;

import com.example.gestaodetarefas.model.Tarefa;
import com.example.gestaodetarefas.repository.TarefaRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
    class TarefaServiceTest {

    @Mock
    private TarefaRepository tarefaRepository;

    @InjectMocks
    private TarefaService tarefaService;

    @Test
    void testSalvarTarefaComSucesso(){
        var tarefa = new Tarefa();
        tarefa.setTitulo("titulo");
        tarefa.setDescricao("descrição");
        tarefa.setStatusTarefa("status");

        when(tarefaRepository.save(tarefa)).thenReturn(tarefa);

        var resposta = tarefaService.salvarTarefa(tarefa);

        verify(tarefaRepository, times(1)).save(tarefa);

        assertEquals(tarefa.getTitulo(),resposta.getTitulo());
        assertEquals(tarefa.getDescricao(),resposta.getDescricao());
        assertEquals(tarefa.getStatusTarefa(),resposta.getStatusTarefa());
    }

    @Test
    void testBuscarTarefaPorIdComSucesso(){
        var tarefa = new Tarefa(1L, "titulo","descricao","status");

        when(tarefaRepository.findById(1L)).thenReturn(Optional.of(tarefa));

        var resposta = tarefaService.buscarTarefaPorId(tarefa.getId());

        verify(tarefaRepository,times(1)).findById(tarefa.getId());

        assertEquals(tarefa.getId(),resposta.getId());
        assertEquals(tarefa.getTitulo(),resposta.getTitulo());
        assertEquals(tarefa.getDescricao(),resposta.getDescricao());
        assertEquals(tarefa.getStatusTarefa(),resposta.getStatusTarefa());
    }

    @Test
    void testExcluirTarefaPorIdComSucesso(){
        var tarefa = new Tarefa(2L,"titulo","descricao","status");

        when(tarefaRepository.findById(tarefa.getId())).thenReturn(Optional.of(tarefa));

        tarefaService.excluirTarefaPorId(tarefa.getId());

        verify(tarefaRepository,times(1)).delete(tarefa);

    }

    @Test
    public void testAtualizarTarefaComSucesso(){

        var tarefa = new Tarefa(1L,"titulo","descricao","status");
        var tarefanova = new  Tarefa("titulonovo","descricaonovo","statusnovo");
       when(tarefaRepository.findById(tarefa.getId())).thenReturn(Optional.of(tarefa));
       when(tarefaRepository.save(tarefa)).thenReturn(tarefanova);

        var resposta = tarefaService.atualizarTarefa(tarefa.getId(),tarefanova);

        verify(tarefaRepository,times(1)).save(resposta);

        assertEquals(tarefa.getId(),resposta.getId());
        assertEquals(tarefanova.getTitulo(),resposta.getTitulo());
        assertEquals(tarefanova.getDescricao(),resposta.getDescricao());
        assertEquals(tarefanova.getStatusTarefa(),resposta.getStatusTarefa());
    }

    @Test
    public void testListarTarefasComSucesso(){
        List<Tarefa> tarefas = List.of(new Tarefa(1L,"titulo","descricao","status"),
        new Tarefa(2L,"titulo","descricao","statusnovo"));
        when(tarefaRepository.findAll()).thenReturn(tarefas);

        var resposta = tarefaService.listarTarefas();

        verify(tarefaRepository,times(1)).findAll();

        assertEquals(2,resposta.size());
    }





}