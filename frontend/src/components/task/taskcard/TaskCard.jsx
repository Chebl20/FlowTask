import React from 'react';
import { Calendar, Tag, Clock, Activity, CheckCircle } from 'lucide-react';

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const statusConfig = {
    todo: { color: 'bg-gray-100 text-gray-700', icon: Clock },
    in_progress: { color: 'bg-blue-100 text-blue-700', icon: Activity },
    completed: { color: 'bg-green-100 text-green-700', icon: CheckCircle }
  };

  const StatusIcon = statusConfig[task.status].icon;

  return (
    <div className="w-full bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5 hover:shadow-md transition-all duration-200 group">
      <div className="flex flex-col h-full space-y-3">
        {/* Header sem prioridade */}
        <div className="flex items-start gap-3">
          <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex-shrink-0 flex items-center justify-center ${statusConfig[task.status].color.split(' ')[0]}`}>
            <StatusIcon className="w-5 h-5" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 line-clamp-2 group-hover:text-orange-600 transition-colors flex-1">
            {task.title}
          </h3>
        </div>
        
        {/* Description */}
        <p className="text-gray-500 text-sm line-clamp-2 flex-1">
          {task.description}
        </p>

        {/* Meta */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>Due: Jan 25, 2025</span>
          </div>
          <span className="hidden sm:inline text-gray-300">•</span>
          <div className="flex items-center gap-1">
            <Tag className="w-3 h-3" />
            <span>Task #{task.id}</span>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex gap-2 pt-3 border-t border-gray-100">
          <button
            onClick={() => onEdit(task)}
            className="flex-1 px-3 py-2 text-sm bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="flex-1 px-3 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;