import React from 'react';
import TaskCard from '../taskcard/TaskCard';
import { CheckSquare } from 'lucide-react';

const TaskList = ({ tasks = [], onEdit, onDelete, onStatusChange }) => {
  // Garantir que tasks seja sempre um array
  const taskList = Array.isArray(tasks) ? tasks : [];
  
  if (taskList.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 sm:py-16 md:py-20">
        <div className="text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <CheckSquare className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
          </div>
          <p className="text-gray-600 text-lg sm:text-xl font-medium mb-2">
            Sem Tarefas
          </p>
          <p className="text-gray-400 text-sm sm:text-base">
            Clique em "Nova Tarefa" para criar sua primeira tarefa!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
      {taskList.map((task) => (
        <div key={task.id || task._id || Math.random()} className="w-full">
          <TaskCard
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
          />
        </div>
      ))}
    </div>
  );
};

export default TaskList;