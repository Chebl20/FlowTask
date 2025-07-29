import React from 'react';
import { Calendar, Tag, Clock, Activity, CheckCircle, AlertCircle } from 'lucide-react';

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  // Mapeamento de status da API para o frontend
  const normalizeStatus = (status) => {
    const statusMap = {
      'PENDENTE': 'todo',
      'EM PROGRESSO': 'in_progress',
      'CONCLUÍDA': 'completed',
      'todo': 'todo',
      'in_progress': 'in_progress',
      'completed': 'completed'
    };
    return statusMap[status] || 'todo';
  };

  const statusConfig = {
    todo: { 
      color: 'bg-gray-100 text-gray-700', 
      icon: Clock,
      label: 'A fazer'
    },
    in_progress: { 
      color: 'bg-blue-100 text-blue-700', 
      icon: Activity,
      label: 'Em progresso'
    },
    completed: { 
      color: 'bg-green-100 text-green-700', 
      icon: CheckCircle,
      label: 'Concluído'
    }
  };

  const priorityConfig = {
    low: { color: 'text-green-600', label: 'Baixa' },
    medium: { color: 'text-yellow-600', label: 'Média' },
    high: { color: 'text-red-600', label: 'Alta' },
    BAIXA: { color: 'text-green-600', label: 'Baixa' },
    MÉDIA: { color: 'text-yellow-600', label: 'Média' },
    ALTA: { color: 'text-red-600', label: 'Alta' }
  };

  // Normalizar o status para garantir compatibilidade
  const normalizedStatus = normalizeStatus(task.status);
  const currentStatus = statusConfig[normalizedStatus] || statusConfig.todo;
  const StatusIcon = currentStatus.icon;

  // Formatar data se existir
  const formatDate = (date) => {
    if (!date) return 'Sem prazo';
    try {
      const d = new Date(date);
      return d.toLocaleDateString('pt-BR', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      });
    } catch {
      return 'Data inválida';
    }
  };

  // Obter configuração de prioridade
  const getPriorityConfig = () => {
    const priority = task.priority || task.prioridade;
    return priorityConfig[priority] || { color: 'text-gray-600', label: 'Não definida' };
  };

  const handleStatusClick = () => {
    if (onStatusChange) {
      // Ciclar através dos status: todo -> in_progress -> completed -> todo
      const statusCycle = {
        todo: 'in_progress',
        in_progress: 'completed',
        completed: 'todo'
      };
      const newStatus = statusCycle[normalizedStatus] || 'todo';
      onStatusChange(task.id, newStatus);
    }
  };

  return (
    <div className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-4 md:p-5 lg:p-6 hover:shadow-md transition-all duration-200 group h-full">
      <div className="flex flex-col h-full space-y-2 sm:space-y-3 md:space-y-4">
        {/* Header com Status Clicável */}
        <div className="flex items-start gap-2 sm:gap-3">
          <button
            onClick={handleStatusClick}
            className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 rounded-md sm:rounded-lg flex-shrink-0 flex items-center justify-center ${currentStatus.color.split(' ')[0]} hover:opacity-80 transition-opacity cursor-pointer`}
            title={`Status: ${currentStatus.label} (clique para alterar)`}
          >
            <StatusIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </button>
          <div className="flex-1">
            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-800 line-clamp-2 group-hover:text-orange-600 transition-colors break-words">
              {task.titulo || task.title || 'Sem título'}
            </h3>
            {/* Badge de Status */}
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${currentStatus.color}`}>
              {currentStatus.label}
            </span>
          </div>
        </div>
        
        {/* Description */}
        <p className="text-gray-500 text-xs sm:text-sm md:text-base line-clamp-2 flex-1 break-words">
          {task.descricao || task.description || 'Sem descrição'}
        </p>

        {/* Meta */}
        <div className="flex flex-col xs:flex-row xs:flex-wrap items-start xs:items-center gap-1 xs:gap-x-3 xs:gap-y-1 text-xs sm:text-sm text-gray-400">
          <div className="flex items-center gap-1 min-w-0">
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="truncate">Prazo: {formatDate(task.dueDate || task.prazo)}</span>
          </div>
          <span className="hidden xs:inline text-gray-300">•</span>
          <div className="flex items-center gap-1 min-w-0">
            <Tag className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="truncate">Tarefa #{task.id || '?'}</span>
          </div>
          <span className="hidden xs:inline text-gray-300">•</span>
          <div className="flex items-center gap-1 min-w-0">
            <AlertCircle className={`w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 ${getPriorityConfig().color}`} />
            <span className={`truncate ${getPriorityConfig().color}`}>
              {getPriorityConfig().label}
            </span>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex gap-1.5 sm:gap-2 md:gap-3 pt-2 sm:pt-3 md:pt-4 border-t border-gray-100">
          <button
            onClick={() => onEdit(task)}
            className="flex-1 min-w-0 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm md:text-base bg-gray-50 text-gray-700 rounded-md sm:rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors font-medium truncate"
          >
            Editar
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="flex-1 min-w-0 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm md:text-base bg-red-50 text-red-600 rounded-md sm:rounded-lg hover:bg-red-100 active:bg-red-200 transition-colors font-medium truncate"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;