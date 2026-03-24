import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import LeaveManagement from './components/LeaveManagement';
import AdminDashboard from './components/AdminDashboard';
import ReportDashboard from './components/ReportDashboard';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userRole, setUserRole] = useState('Employee');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'leave':
        return <LeaveManagement />;
      case 'reports':
        return <ReportDashboard />;
      case 'admin':
        return userRole === 'Admin' || userRole === 'HR Manager' ? <AdminDashboard /> : <div className="p-8 text-center text-danger font-bold">Access Denied: Only Admin/HR can access this page.</div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab} userRole={userRole} setUserRole={setUserRole}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </div>
    </Layout>
  );
}

export default App;
