package com.example.gestaodetarefas.controller;

import com.example.gestaodetarefas.dto.TarefaResponse;
import com.example.gestaodetarefas.model.Tarefa;
import com.example.gestaodetarefas.model.Usuario;
import com.example.gestaodetarefas.service.TarefaService;
import com.example.gestaodetarefas.service.mapper.TarefaMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("Testes do TarefaController")
class TarefaControllerTest {

    @Mock
    private TarefaService tarefaService;

    @Mock
    private TarefaMapper tarefaMapper;

    @InjectMocks
    private TarefaController tarefaController;

    private Usuario usuario;
    private Tarefa tarefaPadrao;
    private Tarefa tarefaAtualizada;
    private TarefaResponse tarefaResponse;

    @BeforeEach
    void setUp() {
        usuario = new Usuario();
        usuario.setId(1L);
        usuario.setEmail("usuario@teste.com");

        tarefaPadrao = new Tarefa(1L, "Tarefa Teste", "Descrição da tarefa", "Pendente");
        tarefaPadrao.setUsuario(usuario);

        tarefaAtualizada = new Tarefa(1L, "Tarefa Atualizada", "Nova descrição", "Concluída");
        tarefaAtualizada.setUsuario(usuario);

        tarefaResponse = new TarefaResponse(1L, "Tarefa Teste", "Descrição da tarefa", "Pendente", 1L, "Teste");
    }

    @Nested
    @DisplayName("Testes de Salvar Tarefa")
    class SalvarTarefaTest {

        @Test
        @DisplayName("Deve salvar uma tarefa com sucesso")
        void deveSalvarTarefaComSucesso() {
            // Arrange
            when(tarefaService.salvarTarefa(any(Tarefa.class))).thenReturn(tarefaPadrao);
            when(tarefaMapper.toResponse(tarefaPadrao)).thenReturn(tarefaResponse);

            // Act
            ResponseEntity<TarefaResponse> response = tarefaController.salvarTarefa(tarefaPadrao, usuario);

            // Assert
            assertAll(
                    () -> assertEquals(HttpStatus.OK, response.getStatusCode(), "Status code deve ser 200"),
                    () -> assertEquals(tarefaResponse, response.getBody(), "Resposta deve conter a tarefa salva"),
                    () -> assertEquals(usuario, tarefaPadrao.getUsuario(), "Usuário deve ser atribuído à tarefa")
            );
            verify(tarefaService, times(1)).salvarTarefa(any(Tarefa.class));
        }

        @Test
        @DisplayName("Deve lançar exceção quando tarefa for nula")
        void deveLancarExcecaoQuandoTarefaForNula() {
            // Act & Assert
            assertThrows(IllegalArgumentException.class,
                    () -> tarefaController.salvarTarefa(null, usuario),
                    "Deveria lançar IllegalArgumentException quando tarefa for nula"
            );
            verify(tarefaService, never()).salvarTarefa(any());
        }

        @Test
        @DisplayName("Deve lançar exceção quando usuário for nulo")
        void deveLancarExcecaoQuandoUsuarioForNulo() {
            // Act & Assert
            assertThrows(IllegalArgumentException.class,
                    () -> tarefaController.salvarTarefa(tarefaPadrao, null),
                    "Deveria lançar IllegalArgumentException quando usuário for nulo"
            );
            verify(tarefaService, never()).salvarTarefa(any());
        }
    }

    @Nested
    @DisplayName("Testes de Listar Tarefas")
    class ListarTarefasTest {

        @Test
        @DisplayName("Deve retornar lista de tarefas")
        void deveRetornarListaDeTarefas() {
            // Arrange
            List<Tarefa> tarefas = Arrays.asList(
                    new Tarefa(1L, "Tarefa 1", "Descrição 1", "Pendente"),
                    new Tarefa(2L, "Tarefa 2", "Descrição 2", "Concluída")
            );
            tarefas.forEach(t -> t.setUsuario(usuario));

            List<TarefaResponse> responses = Arrays.asList(
                    new TarefaResponse(1L, "Tarefa 1", "Descrição 1", "Pendente",1l , "Teste"),
                    new TarefaResponse(2L, "Tarefa 2", "Descrição 2", "Concluída", 1L, "Teste")
            );

            when(tarefaService.listarTarefas(usuario)).thenReturn(tarefas);
            when(tarefaMapper.toResponse(any(Tarefa.class)))
                    .thenReturn(responses.get(0))
                    .thenReturn(responses.get(1));

            // Act
            ResponseEntity<List<TarefaResponse>> response = tarefaController.listarTarefas(usuario);

            // Assert
            assertAll(
                    () -> assertEquals(HttpStatus.OK, response.getStatusCode(), "Status code deve ser 200"),
                    () -> assertEquals(2, response.getBody().size(), "Deveria retornar 2 tarefas"),
                    () -> assertEquals(responses, response.getBody(), "Lista de tarefas não corresponde ao esperado")
            );
            verify(tarefaService, times(1)).listarTarefas(usuario);
            verify(tarefaMapper, times(2)).toResponse(any(Tarefa.class));
        }

        @Test
        @DisplayName("Deve retornar lista vazia quando não houver tarefas")
        void deveRetornarListaVazia() {
            // Arrange
            when(tarefaService.listarTarefas(usuario)).thenReturn(Collections.emptyList());

            // Act
            ResponseEntity<List<TarefaResponse>> response = tarefaController.listarTarefas(usuario);

            // Assert
            assertAll(
                    () -> assertEquals(HttpStatus.OK, response.getStatusCode(), "Status code deve ser 200"),
                    () -> assertTrue(response.getBody().isEmpty(), "Deveria retornar lista vazia")
            );
        }
    }

    @Nested
    @DisplayName("Testes de Buscar Tarefa")
    class BuscarTarefaTest {

        @Test
        @DisplayName("Deve buscar tarefa por ID com sucesso")
        void deveBuscarTarefaPorId() {
            // Arrange
            when(tarefaService.buscarTarefa(1L, usuario)).thenReturn(tarefaPadrao);
            when(tarefaMapper.toResponse(tarefaPadrao)).thenReturn(tarefaResponse);

            // Act
            ResponseEntity<TarefaResponse> response = tarefaController.buscarTarefa(1L, usuario);

            // Assert
            assertAll(
                    () -> assertEquals(HttpStatus.OK, response.getStatusCode(), "Status code deve ser 200"),
                    () -> assertEquals(tarefaResponse, response.getBody(), "Tarefa retornada não corresponde ao esperado")
            );
            verify(tarefaService, times(1)).buscarTarefa(1L, usuario);
            verify(tarefaMapper, times(1)).toResponse(tarefaPadrao);
        }

        @Test
        @DisplayName("Deve lançar exceção quando tarefa não for encontrada")
        void deveLancarExcecaoQuandoTarefaNaoEncontrada() {
            // Arrange
            when(tarefaService.buscarTarefa(999L, usuario)).thenThrow(NoSuchElementException.class);

            // Act & Assert
            assertThrows(NoSuchElementException.class,
                    () -> tarefaController.buscarTarefa(999L, usuario),
                    "Deveria lançar NoSuchElementException quando tarefa não for encontrada"
            );
        }
    }

    @Nested
    @DisplayName("Testes de Atualizar Tarefa")
    class AtualizarTarefaTest {

        @Test
        @DisplayName("Deve atualizar uma tarefa existente com sucesso")
        void deveAtualizarTarefa() {
            // Arrange
            TarefaResponse responseAtualizada = new TarefaResponse(1L, "Tarefa Atualizada", "Nova descrição", "Concluída", 1l, "Teste");

            when(tarefaService.atualizarTarefa(1L, tarefaAtualizada, usuario)).thenReturn(tarefaAtualizada);
            when(tarefaMapper.toResponse(tarefaAtualizada)).thenReturn(responseAtualizada);

            // Act
            ResponseEntity<TarefaResponse> response = tarefaController.atualizarTarefa(1L, tarefaAtualizada, usuario);

            // Assert
            assertAll(
                    () -> assertEquals(HttpStatus.OK, response.getStatusCode(), "Status code deve ser 200"),
                    () -> assertEquals(responseAtualizada, response.getBody(), "Tarefa retornada não corresponde à atualizada")
            );
            verify(tarefaService, times(1)).atualizarTarefa(1L, tarefaAtualizada, usuario);
        }

        @Test
        @DisplayName("Deve lançar exceção ao tentar atualizar tarefa inexistente")
        void deveLancarExcecaoAoAtualizarTarefaInexistente() {
            // Arrange
            when(tarefaService.atualizarTarefa(999L, tarefaAtualizada, usuario))
                    .thenThrow(NoSuchElementException.class);

            // Act & Assert
            assertThrows(NoSuchElementException.class,
                    () -> tarefaController.atualizarTarefa(999L, tarefaAtualizada, usuario),
                    "Deveria lançar NoSuchElementException para tarefa inexistente"
            );
        }

        @Test
        @DisplayName("Deve lançar exceção quando ID do path não corresponde ao ID da tarefa")
        void deveLancarExcecaoQuandoIdPathDiferenteDoIdTarefa() {
            // Arrange
            Tarefa tarefaComIdDiferente = new Tarefa(2L, "Tarefa Errada", "Desc", "Pendente");

            // Act & Assert
            assertThrows(IllegalArgumentException.class,
                    () -> tarefaController.atualizarTarefa(1L, tarefaComIdDiferente, usuario),
                    "Deveria lançar IllegalArgumentException quando IDs não correspondem"
            );
            verify(tarefaService, never()).atualizarTarefa(any(), any(), any());
        }
    }

    @Nested
    @DisplayName("Testes de Deletar Tarefa")
    class DeletarTarefaTest {

        @Test
        @DisplayName("Deve deletar uma tarefa com sucesso")

        void deveDeletarTarefa() {
            // Arrange
            doNothing().when(tarefaService).deletarTarefa(1L, usuario);

            // Act
            ResponseEntity<Void> response = tarefaController.deletarTarefa(1L, usuario);

            // Assert
            assertEquals(HttpStatus.OK, response.getStatusCode(), "Status code deve ser 200");
            assertNull(response.getBody(), "Corpo da resposta deve ser nulo");
            verify(tarefaService, times(1)).deletarTarefa(1L, usuario);
        }

        @Test
        @DisplayName("Deve lançar exceção ao tentar deletar tarefa inexistente")
        void deveLancarExcecaoAoDeletarTarefaInexistente() {
            // Arrange
            doThrow(NoSuchElementException.class).when(tarefaService).deletarTarefa(999L, usuario);

            // Act & Assert
            assertThrows(NoSuchElementException.class,
                    () -> tarefaController.deletarTarefa(999L, usuario),
                    "Deveria lançar NoSuchElementException ao tentar deletar tarefa inexistente"
            );
        }
    }
}