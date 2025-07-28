import React from 'react';
import { X, Home, LogOut } from 'lucide-react';
import api from "../../../services/api";

const Sidebar = ({ isOpen, closeSidebar, onLogout }) => {
  const handleLogout = () => {
    // Chama a API para fazer logout (limpa token do localStorage)
    api.logout();
    
    // Fecha o sidebar se estiver aberto
    if (closeSidebar) {
      closeSidebar();
    }
    
    // Chama a função de logout passada como prop do componente pai
    if (onLogout) {
      onLogout();
    }
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
        border-r border-gray-100 flex flex-col
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
        
        {/* Navegação principal */}
        <nav className="p-4 flex-1">
          <div className="space-y-1">
            <button
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg
                bg-orange-50 text-orange-600 transition-all duration-200"
            >
              <Home className="w-5 h-5 text-orange-600" />
              <span className="font-medium">Dashboard</span>
            </button>
          </div>
        </nav>

        {/* Botão de sair na parte inferior */}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg
              text-red-600 hover:bg-red-50 transition-all duration-200
              group"
          >
            <LogOut className="w-5 h-5 text-red-500 group-hover:text-red-600" />
            <span className="font-medium">Sair</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;