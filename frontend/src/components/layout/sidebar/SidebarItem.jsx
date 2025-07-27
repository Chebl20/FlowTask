// components/sidebar/SidebarItem.jsx
import React from 'react';
import * as Icons from 'lucide-react';

const SidebarItem = ({ item, isActive, onClick }) => {
  const Icon = Icons[item.icon] || Icons.Circle;
  
  // Cores dos ícones baseadas no tipo
  const iconColors = {
    dashboard: 'text-orange-500'
  };

  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center px-4 py-3 rounded-lg
        transition-all duration-200
        ${isActive 
          ? 'bg-white shadow-sm text-gray-900' 
          : 'text-gray-600 hover:bg-white/50'
        }
      `}
    >
      <div className={`${iconColors[item.id] || 'text-gray-500'}`}>
        <Icon className="w-5 h-5" />
      </div>
      <span className="ml-3 font-medium">{item.label}</span>
    </button>
  );
};

export default SidebarItem;