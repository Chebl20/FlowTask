package com.example.gestaodetarefas.controller;

import com.example.gestaodetarefas.model.Tarefa;
import com.example.gestaodetarefas.model.Usuario;
import com.example.gestaodetarefas.service.TarefaService;
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

import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("Testes do TarefaController")
class TarefaControllerTest {

    @Mock
    private TarefaService tarefaService;

    @InjectMocks
    private TarefaController tarefaController;

    @Mock
    private Usuario usuario;

    private Tarefa tarefaPadrao;
    private Tarefa tarefaAtualizada;

    @BeforeEach
    void setUp() {
        tarefaPadrao = new Tarefa(1L, "Tarefa Teste", "Descrição da tarefa", "Pendente");
        tarefaAtualizada = new Tarefa(1L, "Tarefa Atualizada", "Nova descrição", "Concluída");
    }

    @Nested
    @DisplayName("Testes de Salvar Tarefa")
    class SalvarTarefaTest {
        
        @Test
        @DisplayName("Deve salvar uma tarefa com sucesso")
        void deveSalvarTarefaComSucesso() {
            // Arrange
            when(tarefaService.salvarTarefa(tarefaPadrao, usuario)).thenReturn(tarefaPadrao);

            // Act
            ResponseEntity<Tarefa> response = tarefaController.salvarTarefa(tarefaPadrao, usuario);

            // Assert
            assertAll(
                () -> assertEquals(HttpStatus.OK, response.getStatusCode(), "Status code deve ser 200"),
                () -> assertEquals(tarefaPadrao, response.getBody(), "Tarefa retornada deve ser a mesma da requisição")
            );
            verify(tarefaService, times(1)).salvarTarefa(tarefaPadrao, usuario);
        }

        @Test
        @DisplayName("Deve lançar exceção quando tarefa for nula")
        void deveLancarExcecaoQuandoTarefaForNula() {
            // Act & Assert
            assertThrows(IllegalArgumentException.class, 
                () -> tarefaController.salvarTarefa(null, usuario),
                "Deveria lançar IllegalArgumentException quando tarefa for nula"
            );
            verify(tarefaService, never()).salvarTarefa(any(), any());
        }

        @Test
        @DisplayName("Deve lançar exceção quando usuário for nulo")
        void deveLancarExcecaoQuandoUsuarioForNulo() {
            // Act & Assert
            assertThrows(IllegalArgumentException.class, 
                () -> tarefaController.salvarTarefa(tarefaPadrao, null),
                "Deveria lançar IllegalArgumentException quando usuário for nulo"
            );
            verify(tarefaService, never()).salvarTarefa(any(), any());
        }
    }

    @Nested
    @DisplayName("Testes de Listar Tarefas")
    class ListarTarefasTest {
        
        @Test
        @DisplayName("Deve retornar lista de tarefas")
        void deveRetornarListaDeTarefas() {
            // Arrange
            List<Tarefa> tarefas = List.of(
                new Tarefa(1L, "Tarefa 1", "Descrição 1", "Pendente"),
                new Tarefa(2L, "Tarefa 2", "Descrição 2", "Concluída")
            );
            when(tarefaService.listarTarefas(usuario)).thenReturn(tarefas);

            // Act
            ResponseEntity<List<Tarefa>> response = tarefaController.listarTarefas(usuario);

            // Assert
            assertAll(
                () -> assertEquals(HttpStatus.OK, response.getStatusCode(), "Status code deve ser 200"),
                () -> assertEquals(2, response.getBody().size(), "Deveria retornar 2 tarefas"),
                () -> assertEquals(tarefas, response.getBody(), "Lista de tarefas não corresponde ao esperado")
            );
            verify(tarefaService, times(1)).listarTarefas(usuario);
        }

        @Test
        @DisplayName("Deve retornar lista vazia quando não houver tarefas")
        void deveRetornarListaVazia() {
            // Arrange
            when(tarefaService.listarTarefas(usuario)).thenReturn(Collections.emptyList());

            // Act
            ResponseEntity<List<Tarefa>> response = tarefaController.listarTarefas(usuario);

            // Assert
            assertAll(
                () -> assertEquals(HttpStatus.OK, response.getStatusCode()),
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

            // Act
            ResponseEntity<Tarefa> response = tarefaController.buscarTarefa(1L, usuario);

            // Assert
            assertAll(
                () -> assertEquals(HttpStatus.OK, response.getStatusCode(), "Status code deve ser 200"),
                () -> assertEquals(tarefaPadrao, response.getBody(), "Tarefa retornada não corresponde ao esperado")
            );
            verify(tarefaService, times(1)).buscarTarefa(1L, usuario);
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
            when(tarefaService.atualizarTarefa(1L, tarefaAtualizada, usuario)).thenReturn(tarefaAtualizada);

            // Act
            ResponseEntity<Tarefa> response = tarefaController.atualizarTarefa(1L, tarefaAtualizada, usuario);

            // Assert
            assertAll(
                () -> assertEquals(HttpStatus.OK, response.getStatusCode(), "Status code deve ser 200"),
                () -> assertEquals(tarefaAtualizada, response.getBody(), "Tarefa retornada não corresponde à atualizada")
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
