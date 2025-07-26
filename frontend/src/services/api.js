const API_BASE_URL = 'http://localhost:8080';

class TarefaAPI {
  constructor() {
    this.baseUrl = API_BASE_URL;
    this.token = localStorage.getItem('token');
  }

  // Configuração padrão para requisições autenticadas
  getAuthHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    };
  }

  // Autenticação
  async login(email, password) {
    try {
      const response = await fetch(`${this.baseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        this.token = data.token;
        localStorage.setItem('token', data.token);
        return { success: true, data };
      }
      
      return { success: false, error: 'Credenciais inválidas' };
    } catch (error) {
      return { success: false, error: 'Erro ao conectar com o servidor' };
    }
  }

  async registrar(usuario) {
    try {
      const response = await fetch(`${this.baseUrl}/auth/registrar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario)
      });

      if (response.ok) {
        return { success: true };
      }
      
      const error = await response.json();
      return { success: false, error: error.message || 'Erro ao registrar' };
    } catch (error) {
      return { success: false, error: 'Erro ao conectar com o servidor' };
    }
  }

  // Tarefas
  async criarTarefa(tarefa) {
    try {
      const tarefaFormatada = {
        titulo: tarefa.titulo || tarefa.title,
        descricao: tarefa.descricao || tarefa.description,
        status: tarefa.status || 'PENDENTE',
        dataCriacao: new Date().toISOString(),
        dataConclusao: null
      };

      const response = await fetch(`${this.baseUrl}/tarefa/criarTarefa`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(tarefaFormatada)
      });

      if (response.ok) {
        const data = await response.json();
        return { success: true, data };
      }
      
      return { success: false, error: 'Erro ao criar tarefa' };
    } catch (error) {
      return { success: false, error: 'Erro ao conectar com o servidor' };
    }
  }

  async listarTarefas() {
    try {
      const response = await fetch(`${this.baseUrl}/tarefa/listarTarefas`, {
        method: 'GET',
        headers: this.getAuthHeaders()
      });

      if (response.ok) {
        const data = await response.json();
        return { success: true, data };
      }
      
      return { success: false, error: 'Erro ao listar tarefas' };
    } catch (error) {
      return { success: false, error: 'Erro ao conectar com o servidor' };
    }
  }

  async buscarTarefa(id) {
    try {
      const response = await fetch(`${this.baseUrl}/tarefa/${id}`, {
        method: 'GET',
        headers: this.getAuthHeaders()
      });

      if (response.ok) {
        const data = await response.json();
        return { success: true, data };
      }
      
      return { success: false, error: 'Tarefa não encontrada' };
    } catch (error) {
      return { success: false, error: 'Erro ao conectar com o servidor' };
    }
  }

  async atualizarTarefa(id, tarefa) {
    try {
      const response = await fetch(`${this.baseUrl}/tarefa/atualizarTarefa/${id}`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(tarefa)
      });

      if (response.ok) {
        const data = await response.json();
        return { success: true, data };
      }
      
      return { success: false, error: 'Erro ao atualizar tarefa' };
    } catch (error) {
      return { success: false, error: 'Erro ao conectar com o servidor' };
    }
  }

  async deletarTarefa(id) {
    try {
      const response = await fetch(`${this.baseUrl}/tarefa/deletarTarefa/${id}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders()
      });

      if (response.ok) {
        return { success: true };
      }
      
      return { success: false, error: 'Erro ao deletar tarefa' };
    } catch (error) {
      return { success: false, error: 'Erro ao conectar com o servidor' };
    }
  }

  logout() {
    this.token = null;
    localStorage.removeItem('token');
  }

  isAuthenticated() {
    return !!this.token;
  }
}

export default new TarefaAPI();