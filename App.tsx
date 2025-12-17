
import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import MovieCard from './components/MovieCard';
import ForYou from './components/ForYou';
import MyList from './components/MyList';
import Rewards from './components/Rewards';
import Profile from './components/Profile';
import MovieDetail from './components/MovieDetail';
import AdminPanel from './components/AdminPanel';
import { SearchIcon, HomeIcon, ForYouIcon, BookmarkIcon, RewardIcon, ProfileIcon } from './components/Icons';
import { CATEGORIES } from './constants';
import { AppTab, Category, Movie } from './types';
import { api } from './services/api';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.HOME);
  const [activeCategory, setActiveCategory] = useState<Category>('Populer');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [showAdmin, setShowAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Sync with persistent store on mount and interval
  useEffect(() => {
    fetchMovies();
    // Jika ada perubahan di tab Admin, Home akan terupdate saat diakses kembali
    const interval = setInterval(fetchMovies, 5000); 
    return () => clearInterval(interval);
  }, []);

  const fetchMovies = async () => {
    try {
      const data = await api.getSeries();
      setMovies(data || []);
    } catch (err) {
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    if (loading) return <div className="flex-1 flex items-center justify-center text-gray-500 font-bold uppercase tracking-widest text-[10px] animate-pulse">Establishing Connection...</div>;

    switch (activeTab) {
      case AppTab.FOR_YOU: return <ForYou />;
      case AppTab.MY_LIST: return <MyList />;
      case AppTab.REWARDS: return <Rewards />;
      case AppTab.PROFILE: return <Profile onAdminClick={() => setShowAdmin(true)} />;
      case AppTab.HOME:
      default:
        // Filter aktif
        const activeMovies = movies.filter(m => m.isActive);
        return (
          <>
            <Hero />
            <div className="sticky top-0 z-40 ios-blur bg-black/60 border-b border-white/5">
              <div className="flex gap-6 px-5 py-4 overflow-x-auto no-scrollbar">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat as Category)}
                    className={`relative whitespace-nowrap text-[11px] font-black tracking-widest uppercase transition-all duration-300 ${activeCategory === cat ? 'text-white' : 'text-gray-600 hover:text-gray-400'}`}
                  >
                    {cat}
                    {activeCategory === cat && <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-orange-600 rounded-full shadow-[0_0_8px_rgba(234,88,12,0.8)]" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-x-3 gap-y-6 px-4 mt-6 mb-32">
              {activeMovies.length > 0 ? (
                activeMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} onClick={() => setSelectedMovie(movie)} />
                ))
              ) : (
                <div className="col-span-3 flex flex-col items-center justify-center py-32 opacity-20 animate-in fade-in zoom-in duration-700">
                  <svg className="w-14 h-14 mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                  <span className="text-[10px] font-black tracking-[0.2em] uppercase text-gray-400">Tidak ada Video</span>
                </div>
              )}
            </div>
          </>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black overflow-x-hidden selection:bg-orange-600/30">
      {selectedMovie && <MovieDetail movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
      
      {showAdmin && (
        <AdminPanel onClose={() => { setShowAdmin(false); fetchMovies(); }} />
      )}

      {activeTab === AppTab.HOME && (
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 pt-10 pb-4 bg-gradient-to-b from-black/90 via-black/40 to-transparent pointer-events-none">
          <h1 className="text-2xl font-black text-white tracking-tighter italic pointer-events-auto">Drama <span className="text-orange-600">Cuan</span></h1>
          <button className="p-2.5 bg-white/10 rounded-2xl backdrop-blur-xl border border-white/10 pointer-events-auto active:scale-90 transition-transform shadow-2xl">
            <SearchIcon className="w-5 h-5 text-white" />
          </button>
        </header>
      )}

      <main className="flex-1 relative">{renderContent()}</main>

      <nav className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-10 pt-3 ios-blur bg-black/40 border-t border-white/5 safe-bottom">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          {[
            { id: AppTab.HOME, icon: HomeIcon, label: 'Home' },
            { id: AppTab.FOR_YOU, icon: ForYouIcon, label: 'For you' },
            { id: AppTab.MY_LIST, icon: BookmarkIcon, label: 'My List' },
            { id: AppTab.REWARDS, icon: RewardIcon, label: 'Rewards' },
            { id: AppTab.PROFILE, icon: ProfileIcon, label: 'Profile' },
          ].map((item) => (
            <button key={item.id} onClick={() => setActiveTab(item.id as AppTab)} className="flex flex-col items-center gap-1.5 w-16 group transition-all">
              <div className={`flex items-center justify-center h-10 w-16 rounded-3xl transition-all duration-300 ${activeTab === item.id ? 'bg-orange-600/10 shadow-[0_0_20px_rgba(234,88,12,0.2)]' : 'group-hover:bg-white/5'}`}>
                <item.icon className={`w-6 h-6 transition-all duration-300 ${activeTab === item.id ? 'text-orange-500 scale-110' : 'text-gray-600'}`} />
              </div>
              <span className={`text-[9px] font-black uppercase tracking-wider transition-all duration-300 ${activeTab === item.id ? 'text-white' : 'text-gray-600'}`}>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default App;
