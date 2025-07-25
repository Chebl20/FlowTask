// components/task/taskcard/TaskCard.jsx
import React from 'react';
import { Calendar, Clock, Edit, Trash2, Star } from 'lucide-react';

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const priorityConfig = {
    low: { bg: 'bg-green-100', text: 'text-green-700', label: 'Baixa' },
    medium: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Média' },
    high: { bg: 'bg-red-100', text: 'text-red-700', label: 'Alta' }
  };

  const statusConfig = {
    todo: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'A fazer' },
    in_progress: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Em progresso' },
    completed: { bg: 'bg-green-100', text: 'text-green-700', label: 'Concluído' }
  };

  const priority = priorityConfig[task.priority];
  const status = statusConfig[task.status];

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-5 border border-gray-100">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900 flex-1 pr-2">{task.title}</h3>
        <div className="flex gap-1 flex-shrink-0">
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 hover:bg-gray-100 rounded transition-colors"
            aria-label="Editar"
          >
            <Edit className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-1.5 hover:bg-red-50 rounded transition-colors"
            aria-label="Excluir"
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </button>
        </div>
      </div>

      {task.description && (
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{task.description}</p>
      )}

      <div className="flex gap-2 mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${priority.bg} ${priority.text}`}>
          {priority.label}
        </span>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${status.bg} ${status.text}`}>
          {status.label}
        </span>
      </div>

      {task.dueDate && (
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Calendar className="w-4 h-4 mr-1.5" />
          {new Date(task.dueDate).toLocaleDateString('pt-BR')}
        </div>
      )}

      <select
        value={task.status}
        onChange={(e) => onStatusChange(task.id, e.target.value)}
        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50"
      >
        <option value="todo">A fazer</option>
        <option value="in_progress">Em progresso</option>
        <option value="completed">Concluído</option>
      </select>
    </div>
  );
};

export default TaskCard;