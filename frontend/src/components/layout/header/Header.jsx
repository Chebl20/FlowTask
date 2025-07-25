// components/header/Header.jsx
import React from 'react';
import { Search, Menu, Bell, Settings } from 'lucide-react';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="bg-orange-500 text-white sticky top-0 z-40 h-16">
      <div className="h-full px-4 md:px-6">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleSidebar}
              className="p-2 hover:bg-orange-600 rounded-md lg:hidden transition-colors"
              aria-label="Menu"
            >
              <Menu className="w-6 h-6 text-white" />
            </button>
            
            <h1 className="text-xl md:text-2xl font-bold">FlowTask</h1>
            
            <div className="hidden md:flex items-center bg-white/20 rounded-lg px-4 py-2 ml-4">
              <Search className="w-4 h-4 text-white/80 mr-2" />
              <input 
                type="text" 
                placeholder="Search for info..." 
                className="bg-transparent outline-none text-sm text-white placeholder-white/70 w-32 lg:w-64 xl:w-96"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-orange-600 rounded-lg transition-colors md:hidden">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-orange-600 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-orange-600 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;