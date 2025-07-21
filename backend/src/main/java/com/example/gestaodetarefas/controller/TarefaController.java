package com.example.gestaodetarefas.controller;

import com.example.gestaodetarefas.dto.TarefaResponse;
import com.example.gestaodetarefas.model.Tarefa;
import com.example.gestaodetarefas.model.Usuario;
import com.example.gestaodetarefas.service.TarefaService;
import com.example.gestaodetarefas.service.mapper.TarefaMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/tarefa")
public class TarefaController {

    private final TarefaService tarefaService;
    private final TarefaMapper tarefaMapper;

    @Autowired
    public TarefaController(TarefaService tarefaService, TarefaMapper tarefaMapper) {
        this.tarefaService = tarefaService;
        this.tarefaMapper = tarefaMapper;
    }

    @PostMapping("/criarTarefa")
    public ResponseEntity<TarefaResponse> salvarTarefa(
            @RequestBody Tarefa tarefa,
            @AuthenticationPrincipal Usuario usuario) {
        tarefa.setUsuario(usuario);
        Tarefa tarefaSalva = tarefaService.salvarTarefa(tarefa);
        return ResponseEntity.ok(tarefaMapper.toResponse(tarefaSalva));
    }

    @GetMapping("/listarTarefas")
    public ResponseEntity<List<TarefaResponse>> listarTarefas(@AuthenticationPrincipal Usuario usuario) {
        List<Tarefa> tarefas = tarefaService.listarTarefas(usuario);
        List<TarefaResponse> response = tarefas.stream()
                .map(tarefaMapper::toResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TarefaResponse> buscarTarefa(
            @PathVariable Long id,
            @AuthenticationPrincipal Usuario usuario) {
        Tarefa tarefa = tarefaService.buscarTarefa(id, usuario);
        return ResponseEntity.ok(tarefaMapper.toResponse(tarefa));
    }

    @DeleteMapping("/deletarTarefa/{id}")
    public ResponseEntity<Void> deletarTarefa(
            @PathVariable Long id,
            @AuthenticationPrincipal Usuario usuario) {
        tarefaService.deletarTarefa(id, usuario);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/atualizarTarefa/{id}")
    public ResponseEntity<TarefaResponse> atualizarTarefa(
            @PathVariable Long id,
            @RequestBody Tarefa tarefaAtualizada,
            @AuthenticationPrincipal Usuario usuario) {

        Tarefa tarefa = tarefaService.atualizarTarefa(id, tarefaAtualizada, usuario);
        return ResponseEntity.ok(tarefaMapper.toResponse(tarefa));
    }

}
