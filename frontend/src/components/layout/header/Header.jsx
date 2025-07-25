import React from 'react';
import { Menu, Search, Bell, LogOut } from 'lucide-react';

const Header = ({ toggleSidebar, onLogout }) => {
  return (
    <header className="bg-white h-16 fixed w-full top-0 z-50 border-b border-gray-100">
      <div className="h-full px-4 lg:px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <h1 className="text-xl font-semibold text-gray-800">Task Manager</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center bg-gray-50 rounded-lg px-3 py-2 min-w-[300px]">
            <Search className="w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search for tasks..."
              className="bg-transparent border-none outline-none text-sm text-gray-600 placeholder-gray-400 ml-2 w-full"
            />
          </div>
          
          <button className="relative p-2 hover:bg-gray-50 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          {onLogout && (
            <button
              onClick={onLogout}
              className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
              title="Sair"
            >
              <LogOut className="w-5 h-5 text-gray-600" />
            </button>
          )}
          
          <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center cursor-pointer">
            <span className="text-white font-medium text-sm">U</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;