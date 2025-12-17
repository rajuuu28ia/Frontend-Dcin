
import React from 'react';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  onClick?: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="flex flex-col gap-2 group cursor-pointer active:scale-95 transition-transform duration-200"
    >
      <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-lg">
        <img 
          src={movie.image} 
          alt={movie.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/40 backdrop-blur-md px-1.5 py-0.5 rounded text-[10px] font-medium text-white">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
          </svg>
          {movie.views}
        </div>
      </div>
      <div className="flex flex-col gap-0.5">
        <h3 className="text-[13px] font-medium leading-tight text-white line-clamp-2">
          {movie.title}
        </h3>
        <div className="flex items-center gap-1">
          <span className={`text-[9px] font-bold tracking-wider ${movie.tag === 'ORIGINAL' ? 'text-orange-500' : 'text-orange-400'}`}>
            • {movie.tag}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
