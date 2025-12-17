
import React, { useState } from 'react';
import Auth from './Auth';
import AccountSettings from './AccountSettings';
import { 
  QuestionIcon, 
  ShieldIcon, 
  FileIcon, 
  StarIcon, 
  MessageIcon, 
  InfoIcon,
  SettingsIcon
} from './Icons';

interface ProfileProps {
  onAdminClick?: () => void;
}

const Profile: React.FC<ProfileProps> = ({ onAdminClick }) => {
  const [showAuth, setShowAuth] = useState(false);
  const [showAccountSettings, setShowAccountSettings] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const settingsItems = [
    { id: 'faq', label: "FAQ's", icon: QuestionIcon },
    { id: 'privacy', label: 'Privacy & Policy', icon: ShieldIcon },
    { id: 'tos', label: 'Terms of Service', icon: FileIcon },
    { id: 'rate', label: 'Rate Us', icon: StarIcon },
    { id: 'feedback', label: 'Feedback', icon: MessageIcon },
    { id: 'about', label: 'About Us', icon: InfoIcon },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-black pb-32">
      {showAuth && (
        <Auth 
          onClose={() => setShowAuth(false)} 
          onSuccess={() => {
            setIsLoggedIn(true);
            setShowAuth(false);
          }} 
        />
      )}

      {showAccountSettings && (
        <AccountSettings 
          onClose={() => setShowAccountSettings(false)}
          onStartResetPassword={() => {
            setShowAccountSettings(false);
            setShowAuth(true);
          }}
        />
      )}

      <div className="relative h-48 bg-gradient-to-br from-[#1a1a1a] to-black overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[100px] rounded-full -mr-20 -mt-20" />
      </div>

      <div className="px-6 -mt-16 relative z-10">
        <div className="flex items-end justify-between">
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-b from-white/20 to-transparent shadow-2xl">
              <div className="w-full h-full rounded-full bg-[#121212] flex items-center justify-center border border-white/10">
                <svg className="w-12 h-12 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
            </div>
            <div className="mb-2">
              <h1 className="text-2xl font-black text-white tracking-tighter">
                {isLoggedIn ? 'Rizky Admin' : 'Guest'}
              </h1>
              <p className="text-xs text-gray-500 font-mono tracking-wider">ID: 4457039102</p>
            </div>
          </div>
          
          {!isLoggedIn ? (
            <button onClick={() => setShowAuth(true)} className="mb-4 px-5 py-2 bg-white/10 border border-white/10 backdrop-blur-md rounded-xl text-xs font-bold text-white transition-all">Sign In</button>
          ) : (
            <button onClick={() => setIsLoggedIn(false)} className="mb-4 px-5 py-2 bg-red-500/10 border border-red-500/10 rounded-xl text-xs font-bold text-red-500 transition-all">Log Out</button>
          )}
        </div>

        {isLoggedIn && (
          <div className="mt-8 space-y-3">
             <div className="bg-[#121212] border border-white/5 rounded-[32px] overflow-hidden shadow-xl">
               <button 
                  onClick={() => setShowAccountSettings(true)}
                  className="w-full flex items-center justify-between p-5 hover:bg-white/5 transition-colors border-b border-white/5"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center">
                      <SettingsIcon className="w-5 h-5 text-orange-500" />
                    </div>
                    <span className="text-[15px] font-bold text-white">Account Settings</span>
                  </div>
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                </button>
                
                {/* Secret Admin Entry */}
                <button 
                  onClick={onAdminClick}
                  className="w-full flex items-center justify-between p-5 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                    </div>
                    <span className="text-[15px] font-bold text-white">Admin Dashboard</span>
                  </div>
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                </button>
             </div>
          </div>
        )}

        {/* Apple Card Style Wallet */}
        <div className="mt-8 bg-[#121212] border border-white/10 rounded-[32px] p-6 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none" />
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between text-gray-400">
               <span className="text-[10px] font-black uppercase tracking-[0.2em]">My Wallet</span>
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-black text-white tracking-tighter">506</span>
              <div className="flex items-center gap-1.5 bg-yellow-500/20 px-2 py-0.5 rounded-full border border-yellow-500/20">
                <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                <span className="text-[10px] font-black text-yellow-500">PRO</span>
              </div>
            </div>
            <button className="w-full py-4 bg-white text-black rounded-2xl font-black text-sm active:scale-95 transition-all">Top Up</button>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-1">
          <div className="bg-[#121212] border border-white/5 rounded-[32px] overflow-hidden shadow-xl">
            {settingsItems.map((item, idx) => (
              <button key={item.id} className={`w-full flex items-center justify-between p-5 hover:bg-white/5 group ${idx !== settingsItems.length - 1 ? 'border-b border-white/5' : ''}`}>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <item.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-[15px] font-semibold text-gray-200">{item.label}</span>
                </div>
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
