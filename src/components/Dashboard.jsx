import React, { useState, useEffect } from 'react';
import { Clock, Play, Square, Activity, Timer, CalendarCheck } from 'lucide-react';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [lastAction, setLastAction] = useState(null);
  const [recentActivity, setRecentActivity] = useState([
    { id: 1, type: 'Check-in', time: '09:00 AM', date: 'Oct 24, 2023', status: 'Success' },
    { id: 2, type: 'Check-out', time: '05:30 PM', date: 'Oct 23, 2023', status: 'Success' },
    { id: 3, type: 'Check-in', time: '08:55 AM', date: 'Oct 23, 2023', status: 'Success' },
    { id: 4, type: 'Check-out', time: '06:10 PM', date: 'Oct 22, 2023', status: 'Success' },
    { id: 5, type: 'Check-in', time: '09:05 AM', date: 'Oct 22, 2023', status: 'Success' },
  ]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleToggleCheck = () => {
    const now = new Date();
    setIsCheckedIn(!isCheckedIn);
    setLastAction(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    
    // Simulate real-time update
    const newActivity = {
      id: Date.now(),
      type: isCheckedIn ? 'Check-out' : 'Check-in',
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Success'
    };
    setRecentActivity([newActivity, ...recentActivity.slice(0, 4)]);
  };

  const stats = [
    { label: 'Current Status', value: isCheckedIn ? 'Checked In' : 'Checked Out', icon: Activity, color: isCheckedIn ? 'text-success' : 'text-danger' },
    { label: 'Hours Today', value: '4.5 hrs', icon: Timer, color: 'text-primary' },
    { label: 'Monthly Total', value: '140 hrs', icon: CalendarCheck, color: 'text-text-primary' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Clock Display */}
      <div className="flex flex-col items-center justify-center p-8 bg-surface rounded-3xl border border-slate-100 shadow-sm">
        <h2 className="text-text-secondary font-medium mb-2 uppercase tracking-wider text-sm">Current Time</h2>
        <div className="text-6xl font-bold text-text-primary tracking-tighter tabular-nums">
          {currentTime.toLocaleTimeString([], { hour12: false })}
        </div>
      </div>

      {/* Main Action Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-surface rounded-3xl border border-slate-100 p-8 flex flex-col items-center justify-center shadow-sm">
          <button
            onClick={handleToggleCheck}
            className={`w-40 h-40 rounded-full flex flex-col items-center justify-center gap-2 transition-all active:scale-95 shadow-lg border-8 ${
              isCheckedIn 
                ? 'bg-danger text-white border-danger/20 hover:bg-danger/90' 
                : 'bg-success text-white border-success/20 hover:bg-success/90'
            }`}
          >
            {isCheckedIn ? <Square fill="currentColor" size={32} /> : <Play fill="currentColor" size={32} />}
            <span className="font-bold text-lg">{isCheckedIn ? 'Check Out' : 'Check In'}</span>
          </button>
          <div className="mt-6 text-center">
            <p className="text-sm text-text-secondary">
              {lastAction ? `Last action at ${lastAction}` : 'No activity yet today'}
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="bg-surface p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
              <div className="p-2 bg-slate-50 w-fit rounded-lg">
                <stat.icon className={stat.color} size={20} />
              </div>
              <div className="mt-4">
                <p className="text-sm text-text-secondary font-medium">{stat.label}</p>
                <p className={`text-2xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
              </div>
            </div>
          ))}
          
          <div className="md:col-span-3 bg-surface rounded-2xl border border-slate-100 shadow-sm overflow-hidden mt-4">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <h3 className="font-bold text-text-primary">Recent Activity</h3>
              <button className="text-xs font-semibold text-primary hover:underline">View All</button>
            </div>
            <div className="divide-y divide-slate-50">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full ${activity.type === 'Check-in' ? 'bg-success' : 'bg-danger'}`}></div>
                    <div>
                      <p className="text-sm font-semibold text-text-primary">{activity.type}</p>
                      <p className="text-xs text-text-secondary">{activity.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-text-primary">{activity.time}</p>
                    <p className="text-[10px] font-bold text-success uppercase">{activity.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
