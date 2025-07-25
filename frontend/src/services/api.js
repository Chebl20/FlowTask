// services/api.js
const API_URL = 'http://localhost:8080/api';

// Função helper para lidar com respostas
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Erro na requisição');
  }
  return response.json();
};

// Service de tarefas
export const taskService = {
  // Buscar todas as tarefas
  getAll: async () => {
    const response = await fetch(`${API_URL}/tasks`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}` // se tiver autenticação
      }
    });
    return handleResponse(response);
  },

  // Buscar tarefa por ID
  getById: async (id) => {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return handleResponse(response);
  },

  // Criar nova tarefa
  create: async (task) => {
    const response = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(task)
    });
    return handleResponse(response);
  },

  // Atualizar tarefa
  update: async (id, task) => {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(task)
    });
    return handleResponse(response);
  },

  // Deletar tarefa
  delete: async (id) => {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.ok;
  },

  // Atualizar apenas o status
  updateStatus: async (id, status) => {
    const response = await fetch(`${API_URL}/tasks/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ status })
    });
    return handleResponse(response);
  }
};