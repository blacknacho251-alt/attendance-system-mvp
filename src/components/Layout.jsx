import React from 'react';
import { LayoutDashboard, Calendar, BarChart, Settings, Bell, User } from 'lucide-react';

const Layout = ({ children, activeTab, onTabChange }) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'leave', icon: Calendar, label: 'Leave' },
    { id: 'reports', icon: BarChart, label: 'Reports' },
    { id: 'admin', icon: Settings, label: 'Admin' },
  ];

  return (
    <div className="flex h-screen bg-background font-sans">
      {/* Sidebar */}
      <aside className="w-[260px] bg-surface border-r border-slate-200 flex flex-col fixed h-full z-10">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">A</div>
          <span className="text-text-primary font-bold text-lg">Attendance</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 mt-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-primary text-white shadow-md shadow-primary/20' 
                    : 'text-text-secondary hover:bg-slate-50 hover:text-text-primary'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-slate-100 m-4 bg-slate-50 rounded-2xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-300 flex items-center justify-center">
            <User className="text-slate-600" size={20} />
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold text-text-primary truncate">John Doe</p>
            <p className="text-xs text-text-secondary truncate">Employee</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-[260px] flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="h-[64px] bg-surface border-b border-slate-200 px-8 flex items-center justify-between shrink-0">
          <h1 className="text-lg font-semibold text-text-primary capitalize">
            {activeTab}
          </h1>
          <div className="flex items-center gap-4">
            <div className="text-sm text-text-secondary font-medium mr-4">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <button className="p-2 text-text-secondary hover:bg-slate-50 rounded-lg relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 scroll-smooth">
          <div className="max-w-[1200px] mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;

