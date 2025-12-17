
import React from 'react';

const ForYou: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black z-0 overflow-hidden">
      {/* Background Media - Simulating a vertical video */}
      <img 
        src="https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?auto=format&fit=crop&q=80&w=1000" 
        alt="For You Feed" 
        className="w-full h-full object-cover"
      />
      
      {/* Overlay Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40" />
      
      {/* Side Actions (Typical TikTok/Reels style) */}
      <div className="absolute right-4 bottom-48 flex flex-col gap-6 items-center">
        <div className="flex flex-col items-center gap-1 group">
          <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center active:scale-90 transition-transform shadow-lg">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <span className="text-white text-[10px] font-bold drop-shadow-md">12.5k</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center active:scale-90 transition-transform shadow-lg">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <span className="text-white text-[10px] font-bold drop-shadow-md">1.2k</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center active:scale-90 transition-transform shadow-lg">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </div>
          <span className="text-white text-[10px] font-bold drop-shadow-md">Share</span>
        </div>
      </div>

      {/* Main Controls & Caption */}
      <div className="absolute bottom-32 left-0 right-0 px-4 flex flex-col gap-5">
        
        {/* Caption Content */}
        <div className="max-w-[85%]">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-white font-bold text-lg drop-shadow-lg">@agogo.production</h3>
            <span className="bg-orange-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded tracking-tighter">FOLLOW</span>
          </div>
          <p className="text-white text-sm line-clamp-2 drop-shadow-md leading-relaxed font-medium">
            Misteri Candi Borobudur terungkap! Drama terbaru yang wajib kamu tonton. #Borobudur #DramaCuan #Viral
          </p>
        </div>

        {/* Watch Now Button - Premium iOS Style */}
        <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-500 hover:to-orange-300 transition-all duration-300 text-white py-3.5 rounded-2xl font-bold text-base shadow-2xl active:scale-95 w-full">
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
          Watch Now
        </button>

        {/* Video Progress Bar */}
        <div className="flex flex-col gap-1.5">
          <div className="relative w-full h-[4px] bg-white/20 rounded-full overflow-hidden">
            <div className="absolute left-0 top-0 h-full w-[35%] bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
          </div>
          <div className="flex justify-between items-center text-[10px] text-white/70 font-bold px-0.5 tracking-tight">
            <span>01:12</span>
            <span>02:45</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForYou;
