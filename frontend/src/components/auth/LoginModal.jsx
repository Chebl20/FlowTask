import React, { useState } from 'react';
import { X, Mail, Lock, User } from 'lucide-react';

// Simulação da API
const api = {
  login: async (email, password) => {
    // Simula uma chamada de API
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simula validação básica
    if (email && password.length >= 6) {
      return { success: true };
    }
    return { success: false, error: 'Email ou senha inválidos' };
  },

  registrar: async (formData) => {
    // Simula uma chamada de API
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simula validação básica
    if (formData.nome && formData.email && formData.password.length >= 6) {
      return { success: true };
    }
    return { success: false, error: 'Preencha todos os campos corretamente' };
  }
};

const LoginModal = ({ isOpen = true, onLogin = () => alert('Login realizado com sucesso!') }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      if (isLoginMode) {
        const result = await api.login(formData.email, formData.password);
        if (result.success) {
          onLogin();
        } else {
          setError(result.error);
        }
      } else {
        const result = await api.registrar(formData);
        if (result.success) {
          // Fazer login automático após registro
          const loginResult = await api.login(formData.email, formData.password);
          if (loginResult.success) {
            onLogin();
          }
        } else {
          setError(result.error);
        }
      }
    } catch (err) {
      setError('Erro ao processar solicitação');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 sm:p-8 border border-gray-200">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">T</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            {isLoginMode ? 'Bem-vindo de volta!' : 'Criar conta'}
          </h2>
          <p className="text-gray-500 mt-2">
            {isLoginMode
              ? 'Entre para gerenciar suas tarefas'
              : 'Registre-se para começar a organizar suas tarefas'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {!isLoginMode && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  placeholder="Seu nome completo"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                placeholder="seu@email.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Senha
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? 'Processando...'
              : isLoginMode ? 'Entrar' : 'Criar conta'}
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {isLoginMode ? 'Não tem uma conta?' : 'Já tem uma conta?'}
            <button
              onClick={() => {
                setIsLoginMode(!isLoginMode);
                setError('');
                setFormData({ nome: '', email: '', password: '' });
              }}
              className="ml-2 text-orange-500 hover:text-orange-600 font-medium"
            >
              {isLoginMode ? 'Registre-se' : 'Entre'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;