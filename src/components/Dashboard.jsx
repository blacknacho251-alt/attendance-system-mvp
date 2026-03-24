import React, { useState, useEffect } from 'react';
import { Clock, Play, Square, Activity, Timer, CalendarCheck, MapPin, Loader2 } from 'lucide-react';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [lastAction, setLastAction] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0); // in seconds
  const [isLoading, setIsLoading] = useState(false);
  const [recentActivity, setRecentActivity] = useState([
    { id: 1, name: 'Alice Johnson', type: 'Check In', time: '08:55 AM', status: 'Success', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
    { id: 2, name: 'Nara Smith', type: 'Check In', time: '08:56 AM', status: 'Success', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
    { id: 3, name: 'Karo Sande', type: 'Check In', time: '08:26 AM', status: 'Success', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop' },
    { id: 4, name: 'John Smith', type: 'Check In', time: '07:43 AM', status: 'Late', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
    { id: 5, name: 'Ram Jayns', type: 'Check In', time: '09:05 AM', status: 'Late', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
  ]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let interval;
    if (isCheckedIn) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCheckedIn]);

  const formatElapsedTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleToggleCheck = () => {
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const now = new Date();
      const currentIsCheckedIn = !isCheckedIn;
      setIsCheckedIn(currentIsCheckedIn);
      setLastAction(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      
      if (currentIsCheckedIn) {
        setElapsedTime(0);
      }

      // Lateness logic: After 9:15 AM is late
      let status = 'Success';
      if (!isCheckedIn) {
        const nineFifteen = new Date();
        nineFifteen.setHours(9, 15, 0, 0);
        if (now > nineFifteen) {
          status = 'Late';
        }
      }

      const newActivity = {
        id: Date.now(),
        name: 'John Doe',
        type: isCheckedIn ? 'Check Out' : 'Check In',
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: status,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
      };
      setRecentActivity([newActivity, ...recentActivity.slice(0, 4)]);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="flex flex-col items-center space-y-12 animate-in fade-in duration-700">
      {/* Clock Section */}
      <div className="flex flex-col items-center justify-center pt-8">
        <div className="text-[120px] font-bold text-[#1E293B] tracking-tighter tabular-nums leading-none select-none drop-shadow-sm">
          {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
        </div>
        
        {/* Glow Button Container */}
        <div className="relative mt-12 group">
          {/* Animated Background Rings */}
          <div className={`absolute inset-0 scale-150 rounded-full blur-2xl transition-all duration-1000 ${isCheckedIn ? 'bg-danger/10' : 'bg-success/10 group-hover:bg-success/20 animate-pulse'}`}></div>
          <div className={`absolute -inset-10 rounded-full opacity-20 border-2 transition-all duration-1000 ${isCheckedIn ? 'border-danger animate-ping' : 'border-success animate-ping'}`}></div>
          <div className={`absolute -inset-6 rounded-full opacity-30 border transition-all duration-1000 ${isCheckedIn ? 'border-danger' : 'border-success animate-pulse'}`}></div>
          
          <button
            onClick={handleToggleCheck}
            disabled={isLoading}
            className={`relative z-10 flex items-center gap-4 px-12 py-5 rounded-[40px] shadow-2xl transition-all active:scale-95 border-b-4 ${
              isLoading 
                ? 'bg-slate-200 text-slate-400 border-slate-300'
                : isCheckedIn 
                  ? 'bg-danger text-white border-danger/20 hover:bg-danger/90' 
                  : 'bg-[#10B981] text-white border-[#059669] hover:bg-[#059669]'
            }`}
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={32} />
            ) : isCheckedIn ? (
              <Square fill="currentColor" size={28} className="drop-shadow" />
            ) : (
              <div className="bg-white/20 p-1.5 rounded-full">
                <CalendarCheck size={28} className="text-white drop-shadow" />
              </div>
            )}
            <span className="text-3xl font-bold tracking-tight">
              {isLoading ? 'Wait...' : isCheckedIn ? 'Check Out' : 'Check In'}
            </span>
          </button>
        </div>
      </div>

      {/* Activity Table */}
      <div className="w-full bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="px-10 py-8 border-b border-slate-50 flex items-center justify-between">
          <h3 className="text-2xl font-bold text-slate-800">Today's Activity</h3>
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-400 bg-slate-50 px-4 py-2 rounded-full">
            <Activity size={16} /> Live Tracking Active
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-50 bg-slate-50/20 text-slate-400 text-sm font-bold uppercase tracking-widest">
                <th className="px-10 py-6">User Name</th>
                <th className="px-10 py-6">Time</th>
                <th className="px-10 py-6">Status</th>
                <th className="px-10 py-6">Label</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recentActivity.map((activity) => (
                <tr key={activity.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 overflow-hidden shadow-sm group-hover:shadow-md transition-shadow ring-2 ring-white">
                        <img src={activity.avatar} alt={activity.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="font-bold text-slate-700 text-lg">{activity.name}</span>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-2 text-slate-600 font-bold tabular-nums">
                      <Clock size={16} className="text-slate-300" />
                      {activity.time}
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <span className={`inline-flex items-center px-4 py-2 rounded-2xl text-sm font-black tracking-wide border ${
                      activity.status === 'Success' 
                        ? 'bg-[#D1FAE5] text-[#059669] border-[#A7F3D0]' 
                        : 'bg-[#FEE2E2] text-[#DC2626] border-[#FECACA]'
                    }`}>
                      {activity.type}
                    </span>
                  </td>
                  <td className="px-10 py-6">
                    <span className="inline-flex items-center px-4 py-2 rounded-2xl text-sm font-black tracking-wide border bg-slate-100 text-slate-500 border-slate-200">
                      Emerald
                    </span>
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

export default Dashboard;
