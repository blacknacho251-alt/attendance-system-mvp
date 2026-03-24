import React, { useState } from 'react';
import { BarChart3, Clock, LayoutDashboard, Calendar, Settings } from 'lucide-react';

const ReportDashboard = () => {
  const stats = [
    { label: 'Avg Working Hours', value: '8.4 hrs', icon: Clock, color: 'text-primary' },
    { label: 'On-time Rate', value: '92.5%', icon: Calendar, color: 'text-success' },
    { label: 'Overtime Total', value: '14.2 hrs', icon: BarChart3, color: 'text-warning' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-surface p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
            <div className="p-3 bg-slate-50 rounded-2xl mb-4">
              <stat.icon className={stat.color} size={28} />
            </div>
            <p className="text-sm text-text-secondary font-bold uppercase tracking-wider">{stat.label}</p>
            <p className={`text-3xl font-bold mt-2 ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-surface p-12 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-primary/10 text-primary rounded-3xl flex items-center justify-center mb-6">
          <BarChart3 size={32} />
        </div>
        <h2 className="text-2xl font-bold text-text-primary mb-3">Attendance Analytics</h2>
        <p className="text-text-secondary max-w-lg mx-auto">Detailed monthly and yearly reports for individual and team performance are being generated. You will be able to export high-resolution charts and data tables shortly.</p>
        <button className="mt-8 px-8 py-3 bg-primary text-white rounded-2xl font-bold text-sm shadow-xl shadow-primary/25 hover:bg-primary/90 transition-all">
          Generate Full Report
        </button>
      </div>
    </div>
  );
};

export default ReportDashboard;

