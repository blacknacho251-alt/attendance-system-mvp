import React from 'react';
import { LayoutDashboard, Calendar, BarChart, Settings, Bell, User } from 'lucide-react';

const Layout = ({ children, activeTab, onTabChange, userRole, setUserRole }) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'history', icon: Bell, label: 'History' },
    { id: 'leave', icon: Calendar, label: 'Leave' },
    { id: 'reports', icon: BarChart, label: 'Reports' },
    { id: 'admin', icon: Settings, label: 'Admin', roles: ['Admin', 'HR Manager'] },
  ];

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans">
      {/* Sidebar */}
      <aside className="w-[260px] bg-primary flex flex-col fixed h-full z-10">
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary font-black text-xl shadow-lg">
            <LayoutDashboard size={24} />
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-1 mt-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const hasAccess = !item.roles || item.roles.includes(userRole);
            
            if (!hasAccess) return null;

            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-300 group ${
                  isActive 
                    ? 'bg-white/10 text-white shadow-lg' 
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                  <Icon size={20} />
                </div>
                <span className={`font-semibold tracking-wide ${isActive ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-[260px] flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="h-[80px] bg-white border-b border-slate-100 px-10 flex items-center justify-between shrink-0">
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            {menuItems.find(m => m.id === activeTab)?.label || 'Dashboard'}
          </h1>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 bg-slate-50 p-2 pr-4 rounded-full border border-slate-100">
              <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden shadow-inner">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" alt="User" className="w-full h-full object-cover" />
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-slate-800 leading-none">John Doe</p>
                <select 
                  value={userRole} 
                  onChange={(e) => setUserRole(e.target.value)}
                  className="text-[10px] font-bold text-slate-400 uppercase bg-transparent outline-none cursor-pointer hover:text-primary transition-colors"
                >
                  <option value="Employee">Employee</option>
                  <option value="HR Manager">HR Manager</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-10 scroll-smooth bg-slate-50/30">
          <div className="max-w-[1400px] mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
