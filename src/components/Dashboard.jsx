import React, { useState, useEffect } from 'react';
import { Clock, Play, Square, Activity, Timer, CalendarCheck, MapPin, Loader2 } from 'lucide-react';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [lastAction, setLastAction] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0); // in seconds
  const [isLoading, setIsLoading] = useState(false);
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
      setLastAction(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      
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
        type: isCheckedIn ? 'Check-out' : 'Check-in',
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: status
      };
      setRecentActivity([newActivity, ...recentActivity.slice(0, 4)]);
      setIsLoading(false);
    }, 500);
  };

  const stats = [
    { label: 'Current Status', value: isCheckedIn ? 'Checked In' : 'Checked Out', icon: Activity, color: isCheckedIn ? 'text-success' : 'text-danger' },
    { label: 'Work Timer', value: formatElapsedTime(elapsedTime), icon: Timer, color: 'text-primary' },
    { label: 'Monthly Total', value: '140 hrs', icon: CalendarCheck, color: 'text-text-primary' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Clock Display */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col items-center justify-center p-8 bg-surface rounded-3xl border border-slate-100 shadow-sm">
          <h2 className="text-text-secondary font-medium mb-2 uppercase tracking-wider text-xs">Current Time</h2>
          <div className="text-6xl font-bold text-text-primary tracking-tighter tabular-nums font-mono">
            {currentTime.toLocaleTimeString([], { hour12: false })}
          </div>
          <p className="text-xs text-text-secondary mt-4 flex items-center gap-1 font-medium">
            <MapPin size={12} className="text-success" /> Verified Location: HQ Office, Block A
          </p>
        </div>

        <div className="bg-surface rounded-3xl border border-slate-100 p-8 flex flex-col items-center justify-center shadow-sm relative overflow-hidden">
          {isCheckedIn && (
            <div className="absolute top-0 left-0 w-full h-1 bg-success animate-pulse"></div>
          )}
          <button
            onClick={handleToggleCheck}
            disabled={isLoading}
            className={`group relative w-40 h-40 rounded-full flex flex-col items-center justify-center gap-2 transition-all active:scale-95 shadow-xl border-[12px] ${
              isLoading 
                ? 'bg-slate-200 text-slate-400 border-slate-100'
                : isCheckedIn 
                  ? 'bg-danger text-white border-danger/10 hover:bg-danger/90' 
                  : 'bg-success text-white border-success/10 hover:bg-success/90 animate-pulse'
            }`}
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={32} />
            ) : isCheckedIn ? (
              <Square fill="currentColor" size={32} />
            ) : (
              <Play fill="currentColor" size={32} />
            )}
            <span className="font-bold text-lg">
              {isLoading ? 'Processing' : isCheckedIn ? 'Check Out' : 'Check In'}
            </span>
          </button>
          <div className="mt-6 text-center">
            <p className="text-sm font-bold text-text-primary">
              {isCheckedIn ? 'Working Since ' + lastAction : 'Not Checked In'}
            </p>
            <p className="text-xs text-text-secondary mt-1">
              {isCheckedIn ? 'Tap to end your shift' : 'Tap to start your shift'}
            </p>
          </div>
        </div>
      </div>

      {/* Stats and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 grid grid-cols-1 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="bg-surface p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-5">
              <div className="p-3 bg-slate-50 rounded-xl">
                <stat.icon className={stat.color} size={24} />
              </div>
              <div>
                <p className="text-xs text-text-secondary font-bold uppercase tracking-wider">{stat.label}</p>
                <p className={`text-xl font-bold mt-0.5 ${stat.color}`}>{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-2 bg-surface rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
            <h3 className="font-bold text-lg text-text-primary">Attendance History</h3>
            <button className="text-sm font-bold text-primary hover:underline">View All Logs</button>
          </div>
          <div className="divide-y divide-slate-50">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="px-8 py-5 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${activity.type === 'Check-in' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
                    <Activity size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-text-primary">{activity.type}</p>
                    <p className="text-xs text-text-secondary font-medium">{activity.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-text-primary">{activity.time}</p>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${activity.status === 'Success' ? 'bg-success/10 text-success border-success/10' : 'bg-warning/10 text-warning border-warning/10'}`}>
                    {activity.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
