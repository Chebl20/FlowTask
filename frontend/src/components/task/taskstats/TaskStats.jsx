import React from 'react';
import { CheckSquare, CheckCircle, Activity, Clock } from 'lucide-react';

const TaskStats = ({ tasks }) => {
  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    inProgress: tasks.filter(t => t.status === 'in_progress').length,
    todo: tasks.filter(t => t.status === 'todo').length
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-4 sm:mt-6 mb-6">
      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-500 text-xs sm:text-sm">Total Tasks</span>
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-purple-100 rounded-lg flex items-center justify-center">
            <CheckSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600" />
          </div>
        </div>
        <p className="text-xl sm:text-2xl font-bold text-gray-800">{stats.total}</p>
      </div>
      
      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-500 text-xs sm:text-sm">Completed</span>
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-green-100 rounded-lg flex items-center justify-center">
            <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600" />
          </div>
        </div>
        <p className="text-xl sm:text-2xl font-bold text-gray-800">{stats.completed}</p>
      </div>
      
      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-500 text-xs sm:text-sm">In Progress</span>
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
          </div>
        </div>
        <p className="text-xl sm:text-2xl font-bold text-gray-800">{stats.inProgress}</p>
      </div>
      
      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-500 text-xs sm:text-sm">To Do</span>
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-orange-100 rounded-lg flex items-center justify-center">
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-600" />
          </div>
        </div>
        <p className="text-xl sm:text-2xl font-bold text-gray-800">{stats.todo}</p>
      </div>
    </div>
  );
};

export default TaskStats;