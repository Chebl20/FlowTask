import React, { useState } from 'react';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';

const Layout = ({ children, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState('tasks');
  const [menuItems] = useState([
    { id: 'dashboard', label: 'Dashboard', icon: 'Home', bottom: false },
    { id: 'tasks', label: 'Tasks', icon: 'CheckSquare', bottom: false, count: 12 },
    { id: 'projects', label: 'Projects', icon: 'Folder', bottom: false, count: 5 },
    { id: 'calendar', label: 'Calendar', icon: 'Calendar', bottom: false },
    { id: 'activity', label: 'Activity', icon: 'Activity', bottom: false },
    { id: 'settings', label: 'Settings', icon: 'Settings', bottom: true },
  ]);

  const handleMenuItemClick = (itemId) => {
    if (itemId === 'settings') {
      // Aqui você pode adicionar lógica para settings
    }
    setActiveMenuItem(itemId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} onLogout={onLogout} />
      
      <div className="flex">
        <Sidebar 
          activeItem={activeMenuItem} 
          setActiveItem={handleMenuItemClick}
          isOpen={sidebarOpen}
          menuItems={menuItems}
          closeSidebar={() => setSidebarOpen(false)}
        />
        
        <main className="flex-1 w-full lg:ml-64 pt-16">
          <div className="min-h-[calc(100vh-64px)] w-full px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;