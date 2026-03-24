import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import LeaveManagement from './components/LeaveManagement';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'leave':
        return <LeaveManagement />;
      case 'reports':
        return (
          <div className="bg-surface p-12 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-2xl flex items-center justify-center mb-6">
              <span className="font-bold text-2xl">B</span>
            </div>
            <h2 className="text-xl font-bold text-text-primary mb-2">Reports & Analytics</h2>
            <p className="text-text-secondary max-w-sm">Generating real-time insights for your attendance and leave patterns. Coming soon.</p>
          </div>
        );
      case 'admin':
        return (
          <div className="bg-surface p-12 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-2xl flex items-center justify-center mb-6">
              <span className="font-bold text-2xl">A</span>
            </div>
            <h2 className="text-xl font-bold text-text-primary mb-2">Admin Control Panel</h2>
            <p className="text-text-secondary max-w-sm">Configure organization structure, manage users, and define shift policies. Restricted to administrators.</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </Layout>
  );
}

export default App;
