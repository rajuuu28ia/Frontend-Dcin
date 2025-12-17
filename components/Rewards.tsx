
import React, { useState } from 'react';
import { FlameIcon, GiftIcon } from './Icons';

const Rewards: React.FC = () => {
  const [coins, setCoins] = useState(6);
  const [streak, setStreak] = useState(1);

  const checkInDays = [
    { day: 1, amount: 2, status: 'claimed' },
    { day: 2, amount: 2, status: 'available' },
    { day: 3, amount: 2, status: 'locked' },
    { day: 4, amount: 2, status: 'locked' },
    { day: 5, amount: 2, status: 'locked' },
    { day: 6, amount: 2, status: 'locked' },
    { day: 7, amount: 5, status: 'locked' },
  ];

  const tasks = [
    { id: 1, title: 'Watch ads (0/2)', sub: 'Get 5-5 coins each time', reward: 10, action: 'Watch', type: 'ads' },
    { id: 2, title: 'Login rewards', sub: 'Claim your daily bonus', reward: 5, action: 'Claim', type: 'claim' },
    { id: 3, title: 'Bind email', sub: 'Secure your account', reward: 2, action: 'Claim', type: 'claim' },
    { id: 4, title: 'Follow us on Facebook', sub: 'Join our community', reward: 2, action: 'Claim', type: 'claim' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-black pt-12 px-5 pb-32 overflow-y-auto no-scrollbar">
      {/* Header with Coin Balance */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-white tracking-tight">Earn Coins</h1>
          <p className="text-[11px] text-gray-500 font-medium">Unlock premium episodes</p>
        </div>
        <div className="flex items-center gap-2 bg-gradient-to-r from-orange-600/20 to-orange-400/20 border border-orange-500/30 px-4 py-2 rounded-full backdrop-blur-xl">
          <div className="w-5 h-5 bg-gradient-to-tr from-yellow-600 to-yellow-300 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(234,179,8,0.5)]">
            <span className="text-[10px] font-black text-orange-950">$</span>
          </div>
          <span className="text-white font-bold text-sm">{coins}</span>
        </div>
      </div>

      {/* Daily Check-in Section */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-5 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-orange-500/10 blur-3xl rounded-full" />
        
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <FlameIcon className="w-4 h-4 text-orange-500" />
            Check-in Streak: {streak} Day
          </h2>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {checkInDays.map((item) => (
            <div 
              key={item.day}
              className={`flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all duration-300 ${
                item.status === 'claimed' 
                ? 'bg-orange-500/10 border-orange-500/40 opacity-50' 
                : item.status === 'available'
                ? 'bg-white/10 border-white/20 shadow-lg scale-105'
                : 'bg-white/5 border-white/5'
              }`}
            >
              <span className="text-[10px] font-bold text-gray-400">Day {item.day}</span>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                item.status === 'claimed' ? 'bg-gray-700' : 'bg-gradient-to-tr from-yellow-600 to-yellow-300'
              }`}>
                {item.status === 'claimed' ? (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-[12px] font-black text-orange-950">$</span>
                )}
              </div>
              <span className={`text-[10px] font-black ${item.status === 'claimed' ? 'text-gray-500' : 'text-orange-400'}`}>
                +{item.amount}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Tasks Section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 px-1">
          <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
             <GiftIcon className="w-4 h-4 text-purple-400" />
          </div>
          <h2 className="text-base font-bold text-white tracking-tight">Today's Rewards</h2>
        </div>

        {tasks.map((task) => (
          <div key={task.id} className="group relative flex items-center justify-between bg-white/5 hover:bg-white/10 border border-white/5 rounded-[24px] p-4 transition-all active:scale-[0.98]">
            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors">
                {task.title}
              </h3>
              <p className="text-[11px] text-gray-500 font-medium">
                {task.sub}
              </p>
              <div className="flex items-center gap-1.5 mt-1 bg-white/5 self-start px-2 py-0.5 rounded-full border border-white/5">
                <div className="w-3 h-3 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-[7px] font-black text-orange-950">$</span>
                </div>
                <span className="text-[10px] font-bold text-orange-400">+{task.reward} coins</span>
              </div>
            </div>

            <button className={`px-6 py-2.5 rounded-2xl font-bold text-sm shadow-xl transition-all duration-300 active:scale-90 ${
              task.action === 'Watch' 
              ? 'bg-gradient-to-r from-orange-600 to-orange-400 text-white' 
              : 'bg-white/10 text-white border border-white/10 hover:bg-white/20'
            }`}>
              {task.action}
            </button>
          </div>
        ))}
      </div>

      <div className="fixed -bottom-10 -left-10 w-40 h-40 bg-orange-600/10 blur-[80px] rounded-full pointer-events-none" />
    </div>
  );
};

export default Rewards;
