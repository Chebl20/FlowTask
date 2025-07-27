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
    <div className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-4 md:p-5 lg:p-6 hover:shadow-md transition-all duration-200 group h-full">
      <div className="flex flex-col h-full space-y-2 sm:space-y-3 md:space-y-4">
        {/* Header */}
        <div className="flex items-start gap-2 sm:gap-3">
          <div className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 rounded-md sm:rounded-lg flex-shrink-0 flex items-center justify-center ${statusConfig[task.status].color.split(' ')[0]}`}>
            <StatusIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </div>
          <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-800 line-clamp-2 group-hover:text-orange-600 transition-colors flex-1 break-words">
            {task.title}
          </h3>
        </div>
        
        {/* Description */}
        <p className="text-gray-500 text-xs sm:text-sm md:text-base line-clamp-2 flex-1 break-words">
          {task.description}
        </p>

        {/* Meta */}
        <div className="flex flex-col xs:flex-row xs:flex-wrap items-start xs:items-center gap-1 xs:gap-x-3 xs:gap-y-1 text-xs sm:text-sm text-gray-400">
          <div className="flex items-center gap-1 min-w-0">
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="truncate">Due: Jan 25, 2025</span>
          </div>
          <span className="hidden xs:inline text-gray-300">•</span>
          <div className="flex items-center gap-1 min-w-0">
            <Tag className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="truncate">Task #{task.id}</span>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex gap-1.5 sm:gap-2 md:gap-3 pt-2 sm:pt-3 md:pt-4 border-t border-gray-100">
          <button
            onClick={() => onEdit(task)}
            className="flex-1 min-w-0 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm md:text-base bg-gray-50 text-gray-700 rounded-md sm:rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors font-medium truncate"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="flex-1 min-w-0 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm md:text-base bg-red-50 text-red-600 rounded-md sm:rounded-lg hover:bg-red-100 active:bg-red-200 transition-colors font-medium truncate"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;