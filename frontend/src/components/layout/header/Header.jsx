import React from 'react';
import { Menu, Search, Bell, MessageSquare } from 'lucide-react';

const Header = ({ toggleSidebar, onLogout }) => {
  return (
    <header className="bg-white h-16 fixed w-full top-0 z-50 border-b border-gray-200">
      <div className="h-full px-4 lg:px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Botão MENU - apenas no mobile */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden flex items-center gap-2 px-3 py-2 rounded transition-colors
              bg-orange-500 text-white hover:bg-orange-600"
          >
            <Menu className="w-4 h-4" />
            <span className="text-sm font-medium">MENU</span>
          </button>
          
          <div className="hidden md:flex items-center bg-gray-50 rounded px-3 py-2 min-w-[250px]">
            <Search className="w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search for info..."
              className="bg-transparent border-none outline-none text-sm text-gray-600 placeholder-gray-400 ml-2 w-full"
            />
          </div>
        </div>

        <div className="flex items-center">
          <h1 className="text-2xl font-light">
            <span className="text-orange-500">Task</span><span className="text-orange-500 font-normal">Flow</span>
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
          </button>
          
          <button className="p-2 hover:bg-gray-100 rounded transition-colors">
            <MessageSquare className="w-5 h-5 text-gray-600" />
          </button>
          
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer ml-2">
            <span className="text-gray-600 font-medium text-sm">U</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;