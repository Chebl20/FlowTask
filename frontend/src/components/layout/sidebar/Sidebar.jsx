import React from 'react';
import { X, Home, CheckSquare, Folder, Settings, Calendar, Activity } from 'lucide-react';

const Sidebar = ({ activeItem, setActiveItem, isOpen, menuItems, closeSidebar }) => {
  const icons = {
    Home: Home,
    CheckSquare: CheckSquare,
    Folder: Folder,
    Settings: Settings,
    Calendar: Calendar,
    Activity: Activity
  };

  return (
    <>
      {/* Overlay para mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-white z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:top-16 lg:h-[calc(100vh-64px)]
        border-r border-gray-100
      `}>
        {/* Header do Sidebar no mobile */}
        <div className="lg:hidden h-16 flex items-center justify-between px-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <h2 className="font-semibold text-gray-800">Menu</h2>
          </div>
          <button
            onClick={closeSidebar}
            className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        
        <nav className="p-4">
          <div className="space-y-1">
            {menuItems.filter(item => !item.bottom).map(item => {
              const Icon = icons[item.icon];
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveItem(item.id);
                    closeSidebar();
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg
                    transition-all duration-200 group
                    ${activeItem === item.id 
                      ? 'bg-orange-50 text-orange-600' 
                      : 'text-gray-600 hover:bg-gray-50'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 ${activeItem === item.id ? 'text-orange-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                  <span className="font-medium">{item.label}</span>
                  {item.count && (
                    <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${
                      activeItem === item.id 
                        ? 'bg-orange-100 text-orange-600' 
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          
          {/* Bottom items */}
          <div className="absolute bottom-4 left-4 right-4">
            {menuItems.filter(item => item.bottom).map(item => {
              const Icon = icons[item.icon];
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveItem(item.id);
                    closeSidebar();
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg
                    transition-all duration-200 group
                    ${activeItem === item.id 
                      ? 'bg-orange-50 text-orange-600' 
                      : 'text-gray-600 hover:bg-gray-50'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 ${activeItem === item.id ? 'text-orange-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;