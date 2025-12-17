
import React, { useState } from 'react';

interface AuthProps {
  onClose: () => void;
  onSuccess: (userData: any) => void;
}

type AuthMode = 'auth' | 'forgot';
type ForgotStep = 1 | 2 | 3;

const Auth: React.FC<AuthProps> = ({ onClose, onSuccess }) => {
  const [mode, setMode] = useState<AuthMode>('auth');
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [forgotStep, setForgotStep] = useState<ForgotStep>(1);
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [telegramId, setTelegramId] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const resetState = () => {
    setMode('auth');
    setForgotStep(1);
    setEmailOrPhone('');
    setTelegramId('');
    setVerificationCode('');
    setNewPassword('');
  };

  const renderForgotPassword = () => {
    switch (forgotStep) {
      case 1:
        return (
          <div className="flex flex-col gap-5 animate-in slide-in-from-right duration-300">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-black text-white tracking-tighter">Lupa Password</h2>
              <p className="text-xs text-gray-500 font-medium mt-1">Verifikasi identitas Anda untuk melanjutkan</p>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Masukan Email/Nomor</label>
              <input 
                type="text" 
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder="email@example.com atau 0812..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-600 outline-none focus:border-white/30 transition-all"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Id Telegram Anda</label>
              <input 
                type="text" 
                value={telegramId}
                onChange={(e) => setTelegramId(e.target.value)}
                placeholder="@username atau ID"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-600 outline-none focus:border-white/30 transition-all"
              />
            </div>

            <button 
              onClick={() => setForgotStep(2)}
              className="mt-4 w-full py-4 bg-white text-black rounded-3xl font-black text-base shadow-xl active:scale-95 transition-all"
            >
              Selanjutnya
            </button>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col gap-5 animate-in slide-in-from-right duration-300">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-black text-white tracking-tighter">Verifikasi Kode</h2>
              <p className="text-xs text-gray-500 font-medium mt-1">Masukan kode yang dikirim ke Telegram Anda</p>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1 text-center">Masukan Kode verifikasi anda</label>
              <input 
                type="text" 
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="xxxxx"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-5 text-center text-2xl font-black tracking-[0.5em] text-white placeholder:text-gray-700 outline-none focus:border-white/30 transition-all"
                maxLength={6}
              />
            </div>

            <button 
              onClick={() => setForgotStep(3)}
              className="mt-4 w-full py-4 bg-white text-black rounded-3xl font-black text-base shadow-xl active:scale-95 transition-all"
            >
              Verifikasi
            </button>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col gap-5 animate-in slide-in-from-right duration-300">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-black text-white tracking-tighter">Password Baru</h2>
              <p className="text-xs text-gray-500 font-medium mt-1">Buat password yang kuat dan mudah diingat</p>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Password Baru</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-600 outline-none focus:border-white/30 transition-all"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  )}
                </button>
              </div>
            </div>

            <button 
              onClick={resetState}
              className="mt-4 w-full py-4 bg-white text-black rounded-3xl font-black text-base shadow-xl active:scale-95 transition-all"
            >
              Buat password baru
            </button>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex flex-col bg-black animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-12 pb-6">
        <button 
          onClick={mode === 'forgot' ? resetState : onClose} 
          className="p-2 -ml-2 text-gray-400 active:scale-90 transition-transform"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={mode === 'forgot' ? "M15 19l-7-7 7-7" : "M6 18L18 6M6 6l12 12"} />
          </svg>
        </button>
        
        {mode === 'auth' && (
          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5">
            <button 
              onClick={() => setActiveTab('signin')}
              className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'signin' ? 'bg-white text-black shadow-lg' : 'text-gray-500'}`}
            >
              Masuk
            </button>
            <button 
              onClick={() => setActiveTab('signup')}
              className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'signup' ? 'bg-white text-black shadow-lg' : 'text-gray-500'}`}
            >
              Daftar
            </button>
          </div>
        )}
        
        <div className="w-6" /> {/* Spacer */}
      </div>

      <div className="flex-1 px-8 pt-10">
        {mode === 'auth' ? (
          <>
            <div className="mb-10 text-center">
              <h1 className="text-3xl font-black text-white tracking-tighter mb-2">
                {activeTab === 'signin' ? 'Selamat Datang' : 'Buat Akun Baru'}
              </h1>
              <p className="text-sm text-gray-500 font-medium">
                {activeTab === 'signin' ? 'Masuk untuk lanjut menonton drama favorit' : 'Daftar sekarang untuk mendapatkan akses penuh'}
              </p>
            </div>

            <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Masukan Email/Nomor</label>
                <div className="relative group">
                  <input 
                    type="text" 
                    placeholder="email@example.com atau 0812..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-600 outline-none focus:border-white/30 transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Password</label>
                <div className="relative group">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-600 outline-none focus:border-white/30 transition-all"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-white transition-colors"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    )}
                  </button>
                </div>
              </div>

              {activeTab === 'signup' && (
                <div className="flex flex-col gap-2 animate-in slide-in-from-top-4 duration-300">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Users Id Telegram (opsional)</label>
                    <a 
                      href="http://t.me/DracunOffcialBot" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[10px] font-bold text-gray-400 hover:text-white transition-colors"
                    >
                      Dapatkan users id
                    </a>
                  </div>
                  <div className="relative group">
                    <input 
                      type="text" 
                      placeholder="@username atau ID"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-600 outline-none focus:border-white/30 transition-all"
                    />
                  </div>
                  <p className="text-[9px] text-gray-600 font-medium px-1">Bot kami akan membantu mengamankan akun Anda.</p>
                </div>
              )}

              <button 
                onClick={() => onSuccess({})}
                className="mt-6 w-full py-4 bg-white text-black rounded-3xl font-black text-base shadow-[0_10px_30px_rgba(255,255,255,0.1)] active:scale-95 transition-all"
              >
                {activeTab === 'signin' ? 'Masuk Sekarang' : 'Daftar Akun'}
              </button>

              {activeTab === 'signin' && (
                <button 
                  type="button" 
                  onClick={() => setMode('forgot')}
                  className="text-xs font-bold text-gray-500 hover:text-white transition-colors self-center py-2"
                >
                  Lupa password?
                </button>
              )}
            </form>
          </>
        ) : (
          renderForgotPassword()
        )}
      </div>

      {/* Footer Branding */}
      <div className="pb-12 text-center">
        <div className="flex items-center justify-center gap-2 opacity-30">
          <div className="h-[1px] w-8 bg-white" />
          <span className="text-[10px] font-black text-white tracking-widest uppercase italic">Drama Cuan</span>
          <div className="h-[1px] w-8 bg-white" />
        </div>
      </div>
    </div>
  );
};

export default Auth;
