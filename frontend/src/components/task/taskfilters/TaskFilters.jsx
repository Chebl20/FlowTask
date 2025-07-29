import React from 'react';
import { Plus, ChevronDown } from 'lucide-react';

const TaskFilters = ({
  filterStatus,
  setFilterStatus,
  filterPriority,
  setFilterPriority,
  onNewTask
}) => {
  return (
    <div className="w-full bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
      <div className="flex flex-col gap-4">
        {/* Filtros */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="lg:col-span-1">
            <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">
              Status
            </label>
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full appearance-none bg-gray-50 px-4 py-2.5 pr-10 rounded-lg text-sm text-gray-700 font-medium focus:outline-none focus:bg-white focus:ring-2 focus:ring-orange-500/20 transition-all cursor-pointer"
              >
                <option value="all">Todos</option>
                <option value="todo">A fazer</option>
                <option value="in_progress">Em progresso</option>
                <option value="completed">Concluído</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="lg:col-span-1">
            <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">
              Prioridade
            </label>
            <div className="relative">
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="w-full appearance-none bg-gray-50 px-4 py-2.5 pr-10 rounded-lg text-sm text-gray-700 font-medium focus:outline-none focus:bg-white focus:ring-2 focus:ring-orange-500/20 transition-all cursor-pointer"
              >
                <option value="all">Todas</option>
                <option value="low">Baixa</option>
                <option value="medium">Média</option>
                <option value="high">Alta</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="lg:col-span-2 flex items-end">
            <button
              onClick={onNewTask}
              className="w-full sm:w-auto sm:ml-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-200 font-medium"
            >
              <Plus className="w-4 h-4" />
              Nova Tarefa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskFilters;