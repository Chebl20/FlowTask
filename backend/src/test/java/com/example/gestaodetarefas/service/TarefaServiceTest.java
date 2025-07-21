package com.example.gestaodetarefas.service;

import com.example.gestaodetarefas.exception.ResourceNotFoundException;
import com.example.gestaodetarefas.model.Tarefa;
import com.example.gestaodetarefas.model.Usuario;
import com.example.gestaodetarefas.repository.TarefaRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TarefaServiceTest {

    @Mock
    private TarefaRepository tarefaRepository;

    @InjectMocks
    private TarefaService tarefaService;

    private Tarefa tarefa;
    private Usuario usuario;

    @BeforeEach
    void setUp() {
        usuario = new Usuario();
        usuario.setId(1L);
        usuario.setEmail("usuario@teste.com");

        tarefa = new Tarefa();
        tarefa.setId(1L);
        tarefa.setTitulo("Título da Tarefa");
        tarefa.setDescricao("Descrição da Tarefa");
        tarefa.setStatusTarefa("Pendente");
        tarefa.setUsuario(usuario);
    }

    @Test
    @DisplayName("Deve salvar uma tarefa com sucesso")
    void salvarTarefa_ComDadosValidos_RetornaTarefaSalva() {
        // Arrange
        when(tarefaRepository.save(any(Tarefa.class))).thenReturn(tarefa);

        // Act
        Tarefa tarefaSalva = tarefaService.salvarTarefa(tarefa);

        // Assert
        assertNotNull(tarefaSalva);
        assertEquals(tarefa.getTitulo(), tarefaSalva.getTitulo());
        verify(tarefaRepository, times(1)).save(any(Tarefa.class));
    }

    @Test
    @DisplayName("Deve buscar uma tarefa por ID e usuário com sucesso")
    void buscarTarefa_ComIdEUsuarioValidos_RetornaTarefa() {
        // Arrange
        when(tarefaRepository.findByIdAndUsuario(anyLong(), any(Usuario.class)))
                .thenReturn(Optional.of(tarefa));

        // Act
        Tarefa tarefaEncontrada = tarefaService.buscarTarefa(1L, usuario);

        // Assert
        assertNotNull(tarefaEncontrada);
        assertEquals(tarefa.getId(), tarefaEncontrada.getId());
        verify(tarefaRepository, times(1)).findByIdAndUsuario(anyLong(), any(Usuario.class));
    }

    @Test
    @DisplayName("Deve lançar exceção ao buscar tarefa inexistente")
    void buscarTarefa_ComIdInexistente_LancaExcecao() {
        // Arrange
        when(tarefaRepository.findByIdAndUsuario(anyLong(), any(Usuario.class)))
                .thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(ResourceNotFoundException.class,
                () -> tarefaService.buscarTarefa(999L, usuario));
    }

    @Test
    @DisplayName("Deve listar tarefas de um usuário com sucesso")
    void listarTarefas_ComUsuarioValido_RetornaListaDeTarefas() {
        // Arrange
        when(tarefaRepository.findByUsuario(any(Usuario.class)))
                .thenReturn(List.of(tarefa));

        // Act
        List<Tarefa> tarefas = tarefaService.listarTarefas(usuario);

        // Assert
        assertFalse(tarefas.isEmpty());
        assertEquals(1, tarefas.size());
        verify(tarefaRepository, times(1)).findByUsuario(any(Usuario.class));
    }

    @Test
    @DisplayName("Deve atualizar uma tarefa existente com sucesso")
    void atualizarTarefa_ComDadosValidos_RetornaTarefaAtualizada() {
        // Arrange
        Tarefa tarefaAtualizada = new Tarefa();
        tarefaAtualizada.setTitulo("Novo Título");
        tarefaAtualizada.setDescricao("Nova Descrição");
        tarefaAtualizada.setStatusTarefa("Concluída");

        when(tarefaRepository.findByIdAndUsuario(anyLong(), any(Usuario.class)))
                .thenReturn(Optional.of(tarefa));
        when(tarefaRepository.save(any(Tarefa.class))).thenReturn(tarefa);

        // Act
        Tarefa resultado = tarefaService.atualizarTarefa(1L, tarefaAtualizada, usuario);

        // Assert
        assertNotNull(resultado);
        assertEquals(tarefaAtualizada.getTitulo(), resultado.getTitulo());
        assertEquals(tarefaAtualizada.getStatusTarefa(), resultado.getStatusTarefa());
        verify(tarefaRepository, times(1)).save(any(Tarefa.class));
    }

    @Test
    @DisplayName("Deve deletar uma tarefa existente com sucesso")
    void deletarTarefa_ComIdValido_DeletaTarefa() {
        // Arrange
        when(tarefaRepository.findByIdAndUsuario(anyLong(), any(Usuario.class)))
                .thenReturn(Optional.of(tarefa));
        doNothing().when(tarefaRepository).delete(any(Tarefa.class));

        // Act
        tarefaService.deletarTarefa(1L, usuario);

        // Assert
        verify(tarefaRepository, times(1)).delete(any(Tarefa.class));
    }
}