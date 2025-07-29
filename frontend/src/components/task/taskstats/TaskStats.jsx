import React from 'react';
import { CheckSquare, CheckCircle, Activity, Clock } from 'lucide-react';

const TaskStats = ({ tasks = [] }) => {
  // Garantir que tasks seja sempre um array
  const taskList = Array.isArray(tasks) ? tasks : [];
  
  // Função para normalizar status considerando formatos da API e frontend
  const isStatus = (task, statusType) => {
    const statusMap = {
      completed: ['completed', 'CONCLUÍDA', 'CONCLUIDA'],
      in_progress: ['in_progress', 'EM PROGRESSO', 'EM_PROGRESSO'],
      todo: ['todo', 'PENDENTE', 'A_FAZER']
    };
    
    return statusMap[statusType].includes(task.status);
  };
  
  const stats = {
    total: taskList.length,
    completed: taskList.filter(t => isStatus(t, 'completed')).length,
    inProgress: taskList.filter(t => isStatus(t, 'in_progress')).length,
    todo: taskList.filter(t => isStatus(t, 'todo')).length
  };

  // Calcular porcentagem de conclusão
  const completionRate = stats.total > 0 
    ? Math.round((stats.completed / stats.total) * 100) 
    : 0;

  return (
    <div className="space-y-4">
      {/* Barra de progresso geral */}
      {stats.total > 0 && (
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm font-medium">Progresso Geral</span>
            <span className="text-sm font-bold text-green-600">{completionRate}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>
      )}
      
      {/* Cards de estatísticas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500 text-xs sm:text-sm">Total de Tarefas</span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <CheckSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600" />
            </div>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-gray-800">{stats.total}</p>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500 text-xs sm:text-sm">Concluídas</span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-xl sm:text-2xl font-bold text-gray-800">{stats.completed}</p>
            {stats.total > 0 && (
              <span className="text-xs text-green-600">
                ({Math.round((stats.completed / stats.total) * 100)}%)
              </span>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500 text-xs sm:text-sm">Em progresso</span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-xl sm:text-2xl font-bold text-gray-800">{stats.inProgress}</p>
            {stats.total > 0 && (
              <span className="text-xs text-blue-600">
                ({Math.round((stats.inProgress / stats.total) * 100)}%)
              </span>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500 text-xs sm:text-sm">A fazer</span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-600" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-xl sm:text-2xl font-bold text-gray-800">{stats.todo}</p>
            {stats.total > 0 && (
              <span className="text-xs text-orange-600">
                ({Math.round((stats.todo / stats.total) * 100)}%)
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskStats;