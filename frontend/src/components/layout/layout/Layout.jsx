// components/layout/Layout.jsx
import React, { useState } from 'react';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState('tasks');
  const [menuItems] = useState([
    { id: 'dashboard', label: 'Dashboard', icon: 'Home', bottom: false },
    { id: 'tasks', label: 'Tarefas', icon: 'CheckSquare', bottom: false },
    { id: 'projects', label: 'Projetos', icon: 'Folder', bottom: false },
    { id: 'settings', label: 'Configurações', icon: 'Settings', bottom: true },
  ]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex">
        <Sidebar 
          activeItem={activeMenuItem} 
          setActiveItem={setActiveMenuItem}
          isOpen={sidebarOpen}
          menuItems={menuItems}
          closeSidebar={() => setSidebarOpen(false)}
        />
        
        {/* Main content responsivo */}
        <main className="flex-1 w-full lg:pl-64">
          <div className="bg-white min-h-[calc(100vh-64px)]">
            <div className="p-4 md:p-6 lg:p-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;