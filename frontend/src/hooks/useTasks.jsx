// hooks/useTasks.jsx
import { useState, useEffect } from 'react';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Dados mock para teste
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setTasks([
        {
          id: 1,
          title: 'Tarefa de exemplo 1',
          description: 'Descrição da tarefa 1',
          status: 'todo',
          priority: 'high',
          dueDate: '2025-01-30'
        },
        {
          id: 2,
          title: 'Tarefa de exemplo 2',
          description: 'Descrição da tarefa 2',
          status: 'in_progress',
          priority: 'medium',
          dueDate: '2025-01-28'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const createTask = async (taskData) => {
    try {
      const newTask = { ...taskData, id: Date.now() };
      setTasks([...tasks, newTask]);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      setTasks(tasks.map(task => task.id === id ? { ...task, ...taskData } : task));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const deleteTask = async (id) => {
    try {
      setTasks(tasks.filter(task => task.id !== id));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const updateTaskStatus = async (id, status) => {
    return updateTask(id, { status });
  };

  const refetch = () => {
    // Recarregar dados
  };

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
    refetch
  };
};