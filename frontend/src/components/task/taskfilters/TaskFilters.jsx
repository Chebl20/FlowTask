// components/task/taskfilters/TaskFilters.jsx
import React from 'react';
import { Plus } from 'lucide-react';

const TaskFilters = ({
  filterStatus,
  setFilterStatus,
  filterPriority,
  setFilterPriority,
  onNewTask
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        {/* Filtros */}
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="flex-1 sm:flex-initial min-w-[150px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="all">Todos</option>
              <option value="todo">A fazer</option>
              <option value="in_progress">Em progresso</option>
              <option value="completed">Concluído</option>
            </select>
          </div>

          <div className="flex-1 sm:flex-initial min-w-[150px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prioridade
            </label>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="all">Todas</option>
              <option value="low">Baixa</option>
              <option value="medium">Média</option>
              <option value="high">Alta</option>
            </select>
          </div>
        </div>

        {/* Botão Nova Tarefa */}
        <button
          onClick={onNewTask}
          className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
        >
          <Plus className="w-5 h-5" />
          Nova Tarefa
        </button>
      </div>
    </div>
  );
};

export default TaskFilters;