
import React, { useState } from 'react';
import { UserCircleIcon, ShieldIcon, KeyIcon } from './Icons';

interface AccountSettingsProps {
  onClose: () => void;
  onStartResetPassword: () => void;
}

const AccountSettings: React.FC<AccountSettingsProps> = ({ onClose, onStartResetPassword }) => {
  const [telegramId, setTelegramId] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  return (
    <div className="fixed inset-0 z-[250] flex flex-col bg-black animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-12 pb-6 border-b border-white/5">
        <button onClick={onClose} className="p-2 -ml-2 text-gray-400 active:scale-90 transition-transform">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-lg font-bold text-white">Account Settings</h1>
        <div className="w-6" /> {/* Spacer */}
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-6 pt-8">
        {/* Section: Change Profile */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4 px-1">
            <UserCircleIcon className="w-4 h-4 text-orange-500" />
            <h2 className="text-xs font-black text-gray-500 uppercase tracking-[0.2em]">Profile Information</h2>
          </div>
          <div className="bg-[#121212] border border-white/5 rounded-[24px] p-5 flex items-center justify-between group active:scale-[0.98] transition-all">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <svg className="w-7 h-7 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold text-white">Guest User</span>
                <span className="text-xs text-gray-500">Tap to edit your profile</span>
              </div>
            </div>
            <button className="text-xs font-black text-orange-500 hover:text-orange-400">Edit</button>
          </div>
        </div>

        {/* Section: Telegram Verification */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4 px-1">
            <ShieldIcon className="w-4 h-4 text-orange-500" />
            <h2 className="text-xs font-black text-gray-500 uppercase tracking-[0.2em]">Verification</h2>
          </div>
          <div className="bg-[#121212] border border-white/5 rounded-[24px] p-6">
            <h3 className="text-sm font-bold text-white mb-2">Verifikasi Telegram Users Id</h3>
            <p className="text-xs text-red-500/80 font-bold mb-5 leading-relaxed bg-red-500/5 p-3 rounded-xl border border-red-500/10">
              (Verifikasi ini wajib jika anda ingin riset password)
            </p>
            
            <div className="flex flex-col gap-4">
              <div className="relative">
                <input 
                  type="text" 
                  value={telegramId}
                  onChange={(e) => setTelegramId(e.target.value)}
                  placeholder="Enter Telegram ID"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-600 outline-none focus:border-white/30 transition-all text-sm"
                />
              </div>
              <button 
                onClick={() => {
                  setIsVerifying(true);
                  setTimeout(() => setIsVerifying(false), 2000);
                }}
                disabled={isVerifying}
                className="w-full py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-2xl font-bold text-sm transition-all active:scale-95 disabled:opacity-50"
              >
                {isVerifying ? 'Verifying...' : 'Verify Now'}
              </button>
              <div className="text-center">
                <a 
                  href="http://t.me/DracunOffcialBot" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[10px] font-bold text-gray-500 hover:text-white"
                >
                  Need help finding your ID? Open our Bot
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Reset Password */}
        <div className="mb-20">
          <div className="flex items-center gap-2 mb-4 px-1">
            <KeyIcon className="w-4 h-4 text-orange-500" />
            <h2 className="text-xs font-black text-gray-500 uppercase tracking-[0.2em]">Security</h2>
          </div>
          <button 
            onClick={onStartResetPassword}
            className="w-full flex items-center justify-between p-6 bg-[#121212] border border-white/5 rounded-[24px] hover:bg-white/5 transition-colors group active:scale-[0.98]"
          >
            <div className="flex flex-col items-start">
              <span className="text-sm font-bold text-white">Reset password</span>
              <span className="text-[10px] text-gray-500 font-medium">Changed your mind or security concerns?</span>
            </div>
            <svg className="w-5 h-5 text-gray-700 group-hover:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Footer Branding */}
      <div className="pb-12 text-center opacity-20">
        <span className="text-[9px] font-black text-white tracking-[0.3em] uppercase italic">Drama Cuan Secure Access</span>
      </div>
    </div>
  );
};

export default AccountSettings;
