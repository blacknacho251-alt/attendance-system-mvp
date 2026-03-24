import React, { useState } from 'react';
import { Users, UserCheck, UserX, Clock, Search, Download, Check, X, MoreHorizontal } from 'lucide-react';

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const stats = [
    { label: 'Attendance Rate', value: '94.2%', icon: UserCheck, color: 'text-success', trend: '+1.2% from yesterday' },
    { label: 'Late Today', value: '3', icon: Clock, color: 'text-warning', trend: 'Same as yesterday' },
    { label: 'Pending Leaves', value: '5', icon: Activity, color: 'text-primary', trend: 'Needs attention' },
    { label: 'Total Employees', value: '124', icon: Users, color: 'text-text-primary', trend: '+2 new this week' },
  ];

  const employees = [
    { id: 1, name: 'Alice Johnson', dept: 'Design', status: 'On-time', checkIn: '08:45 AM', location: 'Office' },
    { id: 2, name: 'Bob Smith', dept: 'Engineering', status: 'Late', checkIn: '09:15 AM', location: 'Remote' },
    { id: 3, name: 'Charlie Davis', dept: 'Marketing', status: 'On-time', checkIn: '08:55 AM', location: 'Office' },
    { id: 4, name: 'Diana Prince', dept: 'Engineering', status: 'On-time', checkIn: '08:50 AM', location: 'Remote' },
    { id: 5, name: 'Ethan Hunt', dept: 'Operations', status: 'Late', checkIn: '09:30 AM', location: 'Remote' },
  ];

  const pendingLeaves = [
    { id: 1, name: 'Alice Johnson', type: 'Annual Leave', duration: '3 days', from: 'Nov 01' },
    { id: 2, name: 'Charlie Davis', type: 'Personal Leave', duration: '1 day', from: 'Dec 20' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Admin Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-surface p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-slate-50 rounded-lg">
                <stat.icon className={stat.color} size={20} />
              </div>
              <span className="text-[10px] font-bold text-text-secondary uppercase">{stat.trend}</span>
            </div>
            <p className="text-sm text-text-secondary font-medium">{stat.label}</p>
            <p className={`text-2xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main Management Table */}
        <div className="xl:col-span-2 bg-surface rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-xl font-bold text-text-primary">Team Attendance</h2>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={16} />
                <input 
                  type="text" 
                  placeholder="Search employees..."
                  className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none w-full md:w-64 transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="p-2.5 bg-slate-50 text-text-primary rounded-xl border border-slate-100 hover:bg-slate-100 transition-all">
                <Download size={18} />
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider">Employee</th>
                  <th className="px-8 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider">Dept</th>
                  <th className="px-8 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider">Status</th>
                  <th className="px-8 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider">In Time</th>
                  <th className="px-8 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider">Location</th>
                  <th className="px-8 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {employees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                          {emp.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-sm font-semibold text-text-primary">{emp.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-4 text-sm text-text-secondary">{emp.dept}</td>
                    <td className="px-8 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border ${emp.status === 'On-time' ? 'bg-success/10 text-success border-success/20' : 'bg-warning/10 text-warning border-warning/20'}`}>
                        {emp.status}
                      </span>
                    </td>
                    <td className="px-8 py-4 text-sm font-bold text-text-primary">{emp.checkIn}</td>
                    <td className="px-8 py-4 text-sm text-text-secondary">{emp.location}</td>
                    <td className="px-8 py-4 text-right">
                      <button className="text-text-secondary hover:text-text-primary p-1">
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Leave Approvals */}
        <div className="bg-surface rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div className="px-8 py-6 border-b border-slate-100">
            <h2 className="text-xl font-bold text-text-primary">Quick Approvals</h2>
            <p className="text-sm text-text-secondary mt-1">Pending leave requests</p>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {pendingLeaves.map((leave) => (
              <div key={leave.id} className="p-6 hover:bg-slate-50/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-text-primary">{leave.name}</h4>
                    <p className="text-xs text-text-secondary mt-1">{leave.type} • {leave.duration}</p>
                    <p className="text-xs font-medium text-primary mt-2 flex items-center gap-1">
                      <Clock size={12} />
                      Starts {leave.from}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-xl border border-slate-100 text-danger hover:bg-danger/10 hover:border-danger/20 transition-all">
                      <X size={16} />
                    </button>
                    <button className="p-2 rounded-xl bg-success text-white hover:bg-success/90 transition-all shadow-sm">
                      <Check size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="m-6 p-4 bg-slate-50 text-text-primary rounded-2xl text-sm font-bold hover:bg-slate-100 transition-all text-center">
            View All Requests
          </button>
        </div>
      </div>
    </div>
  );
};

const Activity = ({ size, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);

export default AdminDashboard;
