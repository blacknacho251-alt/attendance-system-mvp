import React, { useState } from 'react';
import { Plus, Check, X, Clock } from 'lucide-react';

const LeaveManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [leaves, setLeaves] = useState([
    { id: 1, type: 'Annual Leave', from: '2023-11-01', to: '2023-11-03', status: 'Approved', reason: 'Family vacation' },
    { id: 2, type: 'Sick Leave', from: '2023-10-15', to: '2023-10-15', status: 'Approved', reason: 'Flu' },
    { id: 3, type: 'Personal Leave', from: '2023-12-20', to: '2023-12-21', status: 'Pending', reason: 'Doctor appointment' },
  ]);

  const stats = [
    { label: 'Total Balance', value: '15 Days', color: 'text-primary' },
    { label: 'Pending Requests', value: '1', color: 'text-text-secondary' },
    { label: 'Approved Leaves', value: '5', color: 'text-success' },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Approved': return 'bg-success/10 text-success border-success/20';
      case 'Rejected': return 'bg-danger/10 text-danger border-danger/20';
      default: return 'bg-blue-50 text-blue-600 border-blue-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Approved': return <Check size={14} />;
      case 'Rejected': return <X size={14} />;
      default: return <Clock size={14} />;
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-surface p-6 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-sm text-text-secondary font-medium">{stat.label}</p>
            <p className={`text-2xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-surface rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-text-primary">Leave History</h2>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-primary/30 flex items-center gap-2 hover:bg-primary/90 transition-all active:scale-95"
          >
            <Plus size={18} />
            Request Leave
          </button>
        </div>
        
        {showForm && (
          <div className="p-8 bg-slate-50/50 border-b border-slate-100 animate-in slide-in-from-top-4 duration-300">
            <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-secondary uppercase">Leave Type</label>
                <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all">
                  <option>Annual Leave</option>
                  <option>Sick Leave</option>
                  <option>Personal Leave</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-secondary uppercase">From</label>
                <input type="date" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-secondary uppercase">To</label>
                <input type="date" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
              </div>
              <div className="flex gap-2">
                <button type="button" className="flex-1 bg-primary text-white py-2.5 rounded-xl font-bold text-sm">Submit</button>
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2.5 rounded-xl border border-slate-200 font-bold text-sm text-text-secondary hover:bg-white transition-all">Cancel</button>
              </div>
            </form>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider">Type</th>
                <th className="px-8 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider">Date Range</th>
                <th className="px-8 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider">Status</th>
                <th className="px-8 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider">Reason</th>
                <th className="px-8 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leaves.map((leave) => (
                <tr key={leave.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-5 font-semibold text-text-primary text-sm">{leave.type}</td>
                  <td className="px-8 py-5 text-text-secondary text-sm">
                    {new Date(leave.from).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(leave.to).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="px-8 py-5">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(leave.status)}`}>
                      {getStatusIcon(leave.status)}
                      {leave.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-text-secondary text-sm italic">{leave.reason}</td>
                  <td className="px-8 py-5 text-right">
                    <button className="text-primary font-bold text-sm hover:underline">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaveManagement;

