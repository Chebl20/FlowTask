import { useState, useEffect } from 'react';
import api from '../services/api';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mapear status da API para o formato do frontend
  const mapTaskStatus = (status) => {
    // Normalizar para maiúsculas para garantir o match
    const normalizedStatus = status?.toUpperCase();
    
    const statusMap = {
      'PENDENTE': 'todo',
      'EM PROGRESSO': 'in_progress',
      'CONCLUÍDA': 'completed',
      'CONCLUIDA': 'completed' // Sem acento também
    };
    
    return statusMap[normalizedStatus] || 'todo';
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
      console.log('Tarefas da API:', result.data); // Debug
      
      // Transformar tarefas da API para o formato do frontend
      const mappedTasks = result.data.map(task => ({
        id: task.id,
        title: task.titulo,
        description: task.descricao,
        status: mapTaskStatus(task.status || task.status), // Verificar ambos os campos
        priority: 'medium', // A API não tem prioridade, então vamos definir como padrão
        userId: task.usuarioId,
        userName: task.nomeUsuario
      }));
      
      console.log('Tarefas mapeadas:', mappedTasks); // Debug
      setTasks(mappedTasks);
      setError(null);
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  // Criar tarefa
  const createTask = async (taskData) => {
    // taskData já vem no formato da API do TaskModal
    const result = await api.criarTarefa(taskData);
    
    if (result.success) {
      await loadTasks(); // Recarregar lista
      return { success: true };
    }
    
    return { success: false, error: result.error };
  };

  // Atualizar tarefa
  const updateTask = async (id, taskData) => {
    // Se taskData vier do frontend, precisamos mapear
    const apiTask = taskData.titulo ? taskData : {
      titulo: taskData.title,
      descricao: taskData.description,
      status: mapStatusToAPI(taskData.status)
    };

    const result = await api.atualizarTarefa(id, apiTask);
    
    if (result.success) {
      await loadTasks(); // Recarregar lista
      return { success: true };
    }
    
    return { success: false, error: result.error };
  };

  // Atualizar apenas o status da tarefa
  const updateTaskStatus = async (id, newStatus) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return { success: false, error: 'Tarefa não encontrada' };

    const apiTask = {
      titulo: task.title,
      descricao: task.description,
      status: mapStatusToAPI(newStatus)
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
    deleteTask,
    updateTaskStatus
  };
};