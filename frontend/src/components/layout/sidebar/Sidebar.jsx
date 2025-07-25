// components/sidebar/Sidebar.jsx
import React from 'react';
import SidebarItem from './SidebarItem';

const Sidebar = ({ activeItem, setActiveItem, isOpen, menuItems = [], closeSidebar }) => {
  const mainItems = menuItems.filter(item => !item.bottom);
  const bottomItems = menuItems.filter(item => item.bottom);

  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
    // Fecha sidebar em telas pequenas
    if (window.innerWidth < 1024) {
      closeSidebar();
    }
  };

  return (
    <>
      {/* Overlay para mobile/tablet */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed top-16 left-0 z-50
        w-64 h-[calc(100vh-64px)] 
        bg-gray-50 border-r border-gray-200 
        transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="flex flex-col h-full p-4">
          <div className="flex-1 space-y-1">
            {mainItems.map((item) => (
              <SidebarItem
                key={item.id}
                item={item}
                isActive={activeItem === item.id}
                onClick={() => handleItemClick(item.id)}
              />
            ))}
          </div>
          
          {bottomItems.length > 0 && (
            <div className="border-t border-gray-200 pt-4 mt-4 space-y-1">
              {bottomItems.map((item) => (
                <SidebarItem
                  key={item.id}
                  item={item}
                  isActive={activeItem === item.id}
                  onClick={() => handleItemClick(item.id)}
                />
              ))}
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;