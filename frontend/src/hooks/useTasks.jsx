import { useState, useEffect } from 'react';
import api from '../services/api';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mapear status da API para o formato do frontend
  const mapTaskStatus = (status) => {
    const statusMap = {
      'Pendente': 'todo',
      'Em Progresso': 'in_progress',
      'Concluída': 'completed'
    };
    return statusMap[status] || 'todo';
  };

  // Mapear status do frontend para a API
  const mapStatusToAPI = (status) => {
    const statusMap = {
      'todo': 'Pendente',
      'in_progress': 'Em Progresso',
      'completed': 'Concluída'
    };
    return statusMap[status] || 'Pendente';
  };

  // Carregar tarefas
  const loadTasks = async () => {
    setLoading(true);
    const result = await api.listarTarefas();
    
    if (result.success) {
      // Transformar tarefas da API para o formato do frontend
      const mappedTasks = result.data.map(task => ({
        id: task.id,
        title: task.titulo,
        description: task.descricao,
        status: mapTaskStatus(task.status),
        priority: 'medium', // A API não tem prioridade, então vamos definir como padrão
        userId: task.usuarioId,
        userName: task.nomeUsuario
      }));
      setTasks(mappedTasks);
      setError(null);
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  // Criar tarefa
  const createTask = async (taskData) => {
    const apiTask = {
      titulo: taskData.title,
      descricao: taskData.description,
      statusTarefa: mapStatusToAPI(taskData.status || 'todo')
    };

    const result = await api.criarTarefa(apiTask);
    
    if (result.success) {
      await loadTasks(); // Recarregar lista
      return { success: true };
    }
    
    return { success: false, error: result.error };
  };

  // Atualizar tarefa
  const updateTask = async (id, taskData) => {
    const apiTask = {
      titulo: taskData.title,
      descricao: taskData.description,
      statusTarefa: mapStatusToAPI(taskData.status)
    };

    const result = await api.atualizarTarefa(id, apiTask);
    
    if (result.success) {
      await loadTasks(); // Recarregar lista
      return { success: true };
    }
    
    return { success: false, error: result.error };
  };

  // Deletar tarefa
  const deleteTask = async (id) => {
    const result = await api.deletarTarefa(id);
    
    if (result.success) {
      setTasks(tasks.filter(task => task.id !== id));
      return { success: true };
    }
    
    return { success: false, error: result.error };
  };

  // Carregar tarefas ao montar o componente
  useEffect(() => {
    if (api.isAuthenticated()) {
      loadTasks();
    }
  }, []);

  return {
    tasks,
    loading,
    error,
    loadTasks,
    createTask,
    updateTask,
    deleteTask
  };
};