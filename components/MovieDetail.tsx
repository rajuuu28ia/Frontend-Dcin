
import React, { useState } from 'react';
import { Movie } from '../types';

interface MovieDetailProps {
  movie: Movie;
  onClose: () => void;
}

const MovieDetail: React.FC<MovieDetailProps> = ({ movie, onClose }) => {
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  
  // Simulated episodes data
  const episodes = Array.from({ length: 75 }, (_, i) => ({
    id: i + 1,
    isLocked: i > 4, // First 5 are free
  }));

  const tags = ['Tycoon', 'Pemeran Utama Pria', 'Imajinasi Perkotaan'];

  return (
    <div className="fixed inset-0 z-[150] bg-black flex flex-col animate-in slide-in-from-bottom duration-500 overflow-hidden">
      {/* Background Image with Blur */}
      <div className="absolute inset-0 opacity-40">
        <img src={movie.image} className="w-full h-full object-cover blur-3xl scale-110" alt="" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black" />
      </div>

      {/* Header Bar */}
      <div className="relative z-10 flex items-center justify-between px-6 pt-12 pb-4">
        <button 
          onClick={onClose}
          className="p-2.5 bg-white/10 backdrop-blur-xl rounded-full border border-white/10 active:scale-90 transition-transform"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex gap-4">
          <button className="p-2.5 bg-white/10 backdrop-blur-xl rounded-full border border-white/10 active:scale-90 transition-transform">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
          <button className="p-2.5 bg-white/10 backdrop-blur-xl rounded-full border border-white/10 active:scale-90 transition-transform">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="relative z-10 flex-1 overflow-y-auto no-scrollbar pb-40">
        <div className="px-6 pt-4 flex gap-6">
          {/* Main Poster */}
          <div className="w-1/3 aspect-[2/3] rounded-2xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.5)] border border-white/10">
            <img src={movie.image} className="w-full h-full object-cover" alt={movie.title} />
          </div>
          
          {/* Title and Tags */}
          <div className="flex-1 flex flex-col justify-center gap-3">
            <h1 className="text-2xl font-black text-white leading-tight tracking-tight">
              {movie.title}
            </h1>
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <span key={tag} className="px-2.5 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold text-gray-300 uppercase tracking-wide">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-4 text-xs font-bold text-gray-400">
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                27.8K
              </span>
              <span>•</span>
              <span>75 Episode</span>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="px-6 mt-8">
          <div className="relative">
            <p className={`text-sm text-gray-300 leading-relaxed font-medium ${isDescExpanded ? '' : 'line-clamp-3'}`}>
              Niko Sarena, mahasiswa miskin yang jadi sopir, dipermalukan oleh pacarnya dan orang kaya. Dia mengaktifkan "Sistem Uang Gila" yang membuatnya menjadi triliuner dalam sekejap mata. Akankah ia membalaskan dendamnya atau menemukan cinta sejati?
            </p>
            <button 
              onClick={() => setIsDescExpanded(!isDescExpanded)}
              className="mt-2 text-sm font-black text-white hover:text-orange-400 transition-colors"
            >
              {isDescExpanded ? 'Sembunyikan' : 'Selengkapnya'}
            </button>
          </div>
        </div>

        {/* Episodes Section */}
        <div className="px-6 mt-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-black text-white tracking-tight">Episode</h2>
            <span className="text-xs font-bold text-gray-500">Pilih Episode</span>
          </div>
          
          <div className="grid grid-cols-6 gap-3">
            {episodes.map((ep) => (
              <button 
                key={ep.id}
                className={`relative aspect-square flex items-center justify-center rounded-2xl font-black text-sm transition-all active:scale-90 ${
                  ep.id === 1 
                  ? 'bg-white text-black shadow-[0_10px_20px_rgba(255,255,255,0.1)]' 
                  : 'bg-white/5 border border-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {ep.id}
                {ep.isLocked && (
                  <div className="absolute top-1 right-1">
                    <svg className="w-2.5 h-2.5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Action Bar */}
      <div className="absolute bottom-0 left-0 right-0 p-6 ios-blur bg-black/40 border-t border-white/5 safe-bottom z-20">
        <button className="w-full py-4.5 bg-gradient-to-r from-orange-600 to-orange-400 text-white rounded-[24px] font-black text-base shadow-[0_15px_30px_rgba(234,88,12,0.3)] active:scale-95 transition-all">
          Tonton Sekarang
        </button>
      </div>
    </div>
  );
};

export default MovieDetail;
