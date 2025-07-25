import React, { useState, useEffect } from 'react';
import Layout from './components/layout/layout/Layout';
import TaskFilters from './components/task/taskfilters/TaskFilters';
import TaskList from './components/task/tasklist/TaskList';
import TaskStats from './components/task/taskstats/TaskStats';
import TaskModal from './components/task/taskcard/TaskModal';
import LoginModal from './components/auth/LoginModal';
import { useTasks } from './hooks/useTasks';
import api from './services/api';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(api.isAuthenticated());
  const [showLoginModal, setShowLoginModal] = useState(!isAuthenticated);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  
  const { tasks, loading, error, createTask, updateTask, deleteTask, loadTasks } = useTasks();

  useEffect(() => {
    if (!api.isAuthenticated()) {
      setShowLoginModal(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setShowLoginModal(false);
    loadTasks();
  };

  const handleLogout = () => {
    api.logout();
    setIsAuthenticated(false);
    setShowLoginModal(true);
  };

  const handleNewTask = () => {
    setEditingTask(null);
    setShowTaskModal(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskModal(true);
  };

  const handleSaveTask = async (taskData) => {
    let result;
    
    if (editingTask) {
      result = await updateTask(editingTask.id, taskData);
    } else {
      result = await createTask(taskData);
    }

    if (result.success) {
      setShowTaskModal(false);
      setEditingTask(null);
    } else {
      alert(result.error);
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
      const result = await deleteTask(id);
      if (!result.success) {
        alert(result.error);
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      const result = await updateTask(id, { ...task, status: newStatus });
      if (!result.success) {
        alert(result.error);
      }
    }
  };

  const filteredTasks = tasks.filter(task => {
    const statusMatch = filterStatus === 'all' || task.status === filterStatus;
    const priorityMatch = filterPriority === 'all' || task.priority === filterPriority;
    return statusMatch && priorityMatch;
  });

  if (!isAuthenticated) {
    return <LoginModal isOpen={showLoginModal} onLogin={handleLogin} />;
  }

  return (
    <Layout onLogout={handleLogout}>
      <div className="w-full max-w-full mx-auto overflow-x-hidden">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">My Tasks</h1>
          <p className="text-gray-500 text-sm sm:text-base">Manage and track your daily tasks efficiently</p>
        </div>
        
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        
        <TaskStats tasks={tasks} />
        
        <TaskFilters
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          filterPriority={filterPriority}
          setFilterPriority={setFilterPriority}
          onNewTask={handleNewTask}
        />
        
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
            <p className="mt-2 text-gray-500">Carregando tarefas...</p>
          </div>
        ) : (
          <TaskList
            tasks={filteredTasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onStatusChange={handleStatusChange}
          />
        )}
      </div>

      {showTaskModal && (
        <TaskModal
          isOpen={showTaskModal}
          onClose={() => {
            setShowTaskModal(false);
            setEditingTask(null);
          }}
          onSave={handleSaveTask}
          task={editingTask}
        />
      )}
    </Layout>
  );
}

export default App;