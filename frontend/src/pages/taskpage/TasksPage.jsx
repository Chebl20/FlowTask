// pages/taskpage/TasksPage.jsx
import React, { useState } from 'react';
import { useTasks } from '../../hooks/useTasks';
import TaskList from '../../components/task/tasklist/TaskList';
import TaskModal from '../../components/task/taskcard/TaskModal';
import TaskFilters from '../../components/task/taskfilters/TaskFilters';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import ErrorMessage from '../../components/ui/ErrorMessage';

const TasksPage = () => {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  
  const { 
    tasks, 
    loading, 
    error, 
    createTask, 
    updateTask, 
    deleteTask, 
    updateTaskStatus,
    refetch 
  } = useTasks();

  const handleCreateTask = async (taskData) => {
    const result = await createTask(taskData);
    if (result.success) {
      setShowTaskModal(false);
      console.log('Tarefa criada com sucesso!');
    } else {
      alert(`Erro ao criar tarefa: ${result.error}`);
    }
  };

  const handleUpdateTask = async (taskData) => {
    const result = await updateTask(editingTask.id, taskData);
    if (result.success) {
      setEditingTask(null);
      setShowTaskModal(false);
      console.log('Tarefa atualizada com sucesso!');
    } else {
      alert(`Erro ao atualizar tarefa: ${result.error}`);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
      const result = await deleteTask(taskId);
      if (!result.success) {
        alert(`Erro ao deletar tarefa: ${result.error}`);
      }
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    const result = await updateTaskStatus(taskId, newStatus);
    if (!result.success) {
      alert(`Erro ao atualizar status: ${result.error}`);
    }
  };

  const filteredTasks = tasks.filter(task => {
    const statusMatch = filterStatus === 'all' || task.status === filterStatus;
    const priorityMatch = filterPriority === 'all' || task.priority === filterPriority;
    return statusMatch && priorityMatch;
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;

  return (
    <div className="w-full">
      {/* Header da página */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Minhas Tarefas</h1>
        <p className="text-gray-600 text-sm md:text-base">Gerencie suas tarefas de forma eficiente</p>
      </div>
      
      {/* Filtros e botão Nova Tarefa */}
      <TaskFilters 
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        filterPriority={filterPriority}
        setFilterPriority={setFilterPriority}
        onNewTask={() => {
          setEditingTask(null);
          setShowTaskModal(true);
        }}
      />
      
      {/* Lista de tarefas */}
      <TaskList 
        tasks={filteredTasks}
        onEdit={(task) => {
          setEditingTask(task);
          setShowTaskModal(true);
        }}
        onDelete={handleDeleteTask}
        onStatusChange={handleStatusChange}
      />
      
      {/* Modal */}
      <TaskModal
        isOpen={showTaskModal}
        onClose={() => {
          setShowTaskModal(false);
          setEditingTask(null);
        }}
        onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
        task={editingTask}
      />
    </div>
  );
};

export default TasksPage;