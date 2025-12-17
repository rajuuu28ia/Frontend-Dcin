
import React, { useState } from 'react';

type SubTab = 'My List' | 'History';

const MyList: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('My List');

  return (
    <div className="flex flex-col min-h-screen bg-black pt-16 px-5">
      {/* Top Sub-navigation */}
      <div className="flex items-center gap-8 mb-8 border-b border-white/5">
        {(['My List', 'History'] as SubTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveSubTab(tab)}
            className="relative pb-3 transition-all duration-300"
          >
            <span className={`text-base font-bold tracking-tight ${
              activeSubTab === tab ? 'text-white' : 'text-gray-500'
            }`}>
              {tab}
            </span>
            {activeSubTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white rounded-t-full shadow-[0_-2px_8px_rgba(255,255,255,0.4)]" />
            )}
          </button>
        ))}
      </div>

      {/* Empty State Content */}
      <div className="flex-1 flex flex-col items-center justify-center -mt-20">
        {/* iOS-Style Empty Illustration */}
        <div className="relative w-48 h-48 mb-6 flex items-center justify-center">
          {/* Decorative Circles & Sparkles */}
          <div className="absolute inset-0 border border-dashed border-white/10 rounded-full animate-[spin_20s_linear_infinite]" />
          <div className="absolute top-4 right-8 w-1.5 h-1.5 bg-white/40 rounded-full" />
          <div className="absolute bottom-10 left-6 w-2 h-2 bg-white/20 rounded-full" />
          <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-1 h-1 bg-white/60 rounded-full" />
          
          {/* Overlapping Cards */}
          <div className="relative">
            {/* Back Card */}
            <div className="w-28 h-20 bg-gradient-to-br from-white/10 to-transparent border border-white/10 rounded-xl backdrop-blur-sm transform -rotate-6 translate-x-[-10px] translate-y-[-5px]" />
            
            {/* Front Card */}
            <div className="absolute top-4 left-4 w-28 h-20 bg-white/5 border border-white/20 rounded-xl backdrop-blur-md shadow-2xl flex flex-col p-3 gap-2">
               <div className="w-1/2 h-1.5 bg-white/20 rounded-full" />
               <div className="w-3/4 h-1.5 bg-white/10 rounded-full" />
               <div className="w-2/3 h-1.5 bg-white/10 rounded-full" />
            </div>
          </div>
          
          {/* Sparkle Icons */}
          <svg className="absolute top-0 left-4 w-4 h-4 text-white/40" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" />
          </svg>
        </div>

        <h2 className="text-xl font-bold text-white tracking-tight mb-2">
          {activeSubTab === 'My List' ? 'List Anda Kosong' : 'Belum Ada Riwayat'}
        </h2>
        <p className="text-gray-500 text-center text-sm max-w-[240px] leading-relaxed">
          {activeSubTab === 'My List' 
            ? 'Simpan drama favorit Anda di sini agar mudah ditemukan kembali.' 
            : 'Mulai menonton sekarang untuk melihat riwayat tontonan Anda.'}
        </p>
        
        <button 
          onClick={() => window.location.reload()}
          className="mt-8 px-8 py-3 bg-white/5 border border-white/10 rounded-2xl text-white font-bold text-sm hover:bg-white/10 active:scale-95 transition-all"
        >
          Jelajahi Drama
        </button>
      </div>
    </div>
  );
};

export default MyList;
