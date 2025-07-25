import React from 'react';
import TaskCard from '../taskcard/TaskCard';
import { CheckSquare } from 'lucide-react';

const TaskList = ({ tasks, onEdit, onDelete, onStatusChange }) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 mx-auto max-w-md">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckSquare className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-gray-600 text-lg font-medium mb-2">No tasks found</p>
        <p className="text-gray-400 text-sm">Click "New Task" to create your first task</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Mobile: Stack vertical */}
      <div className="block sm:hidden space-y-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
          />
        ))}
      </div>
      
      {/* Tablet e Desktop: Grid */}
      <div className="hidden sm:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;