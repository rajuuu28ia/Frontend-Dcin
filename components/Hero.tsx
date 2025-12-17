
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative w-full aspect-[4/5] md:aspect-[16/9] flex flex-col items-center justify-end pb-8">
      {/* Dynamic Background Image */}
      <div className="absolute inset-0">
        <img 
          src="https://picsum.photos/seed/jcore/800/1000" 
          alt="Hero" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center gap-4 text-center px-4 w-full max-w-lg">
        <div className="flex flex-col items-center">
            <h1 className="text-5xl font-black tracking-tighter text-white drop-shadow-2xl italic">
                JCORE
            </h1>
            <div className="flex items-center gap-4 mt-2 text-xs font-medium text-gray-300">
                <span>• Agogo production</span>
                <span>• Movies</span>
            </div>
        </div>

        <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-500 hover:to-orange-300 transition-all duration-300 text-white px-10 py-3.5 rounded-2xl font-bold text-base shadow-xl active:scale-95 w-full sm:w-auto">
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
          Watch Now
        </button>

        {/* Pagination Dots */}
        <div className="flex gap-2 mt-2">
          <div className="w-4 h-1 bg-white rounded-full" />
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-1 h-1 bg-white/30 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
