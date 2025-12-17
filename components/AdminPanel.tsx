
import React, { useState, useEffect } from 'react';
import { Movie, UserAccount } from '../types';
import SeriesModal from './SeriesModal';
import { api } from '../services/api';

interface AdminPanelProps {
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(api.checkAuth());
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [adminTab, setAdminTab] = useState<'series' | 'users'>('series');
  const [showAddModal, setShowAddModal] = useState(false);
  
  const [movies, setMovies] = useState<Movie[]>([]);
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) fetchData();
  }, [isAuthenticated]);

  const fetchData = async () => {
    setIsLoading(true);
    const [moviesData, usersData] = await Promise.all([
      api.getSeries(),
      api.getUsers()
    ]);
    setMovies(moviesData);
    setUsers(usersData);
    setIsLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const res = await api.login(credentials);
    if (res.success) {
      setIsAuthenticated(true);
    } else {
      setError('Login Gagal! Periksa kembali akses Anda.');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Hapus series ini?')) {
      await api.deleteSeries(id);
      fetchData();
    }
  };

  const handleToggleBlock = async (id: string, isBlocked: boolean) => {
    await api.toggleBlock(id, !isBlocked);
    fetchData();
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[500] bg-black flex flex-col items-center justify-center p-8 animate-in fade-in duration-300">
        <div className="w-full max-w-sm space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-black text-white tracking-tighter italic mb-2">DRAMA CUAN</h1>
            <p className="text-orange-500 font-bold tracking-widest uppercase text-[10px]">Secure Admin Portal</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Username</label>
              <input 
                type="text" 
                placeholder="admin" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-orange-500/50 transition-all"
                onChange={e => setCredentials({...credentials, username: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Password</label>
              <input 
                type="password" 
                placeholder="admin123" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-orange-500/50 transition-all"
                onChange={e => setCredentials({...credentials, password: e.target.value})}
              />
            </div>
            {error && <p className="text-red-500 text-[10px] font-bold text-center bg-red-500/10 py-2 rounded-lg border border-red-500/20">{error}</p>}
            <button type="submit" className="w-full py-4 bg-orange-600 text-white rounded-2xl font-black text-sm shadow-[0_10px_30px_rgba(234,88,12,0.3)] active:scale-95 transition-all">Masuk Dashboard</button>
            <button onClick={onClose} type="button" className="w-full text-gray-500 text-xs font-bold hover:text-white transition-colors">Kembali</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[300] bg-black flex flex-col animate-in slide-in-from-right duration-300">
      <div className="flex items-center justify-between px-6 pt-12 pb-6 border-b border-white/5 ios-blur bg-black/80 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="p-2 text-gray-400 active:scale-90"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg></button>
          <h1 className="text-xl font-black text-white italic tracking-tighter">ADMIN <span className="text-orange-500">DASHBOARD</span></h1>
        </div>
        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5">
          <button onClick={() => setAdminTab('series')} className={`px-5 py-2 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all ${adminTab === 'series' ? 'bg-orange-600 text-white' : 'text-gray-500'}`}>Series</button>
          <button onClick={() => setAdminTab('users')} className={`px-5 py-2 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all ${adminTab === 'users' ? 'bg-orange-600 text-white' : 'text-gray-500'}`}>Users</button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-6">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full" />
          </div>
        ) : adminTab === 'series' ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-sm font-black text-gray-500 uppercase tracking-widest">Management Series</h2>
              <button onClick={() => setShowAddModal(true)} className="px-6 py-3 bg-orange-600 text-white rounded-2xl font-black text-xs shadow-xl active:scale-95 transition-all">Add Series</button>
            </div>
            
            {movies.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 opacity-20">
                <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" strokeWidth="2"/></svg>
                <p className="font-black uppercase tracking-widest text-xs">Tidak ada Video</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {movies.map(movie => (
                  <div key={movie.id} className="bg-[#121212] border border-white/5 rounded-3xl p-4 flex gap-4 animate-in fade-in duration-500">
                    <div className="w-20 aspect-[2/3] rounded-xl overflow-hidden shrink-0">
                       <img src={movie.image} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <span className="text-[10px] font-bold text-gray-500 uppercase">{movie.createdAt}</span>
                        <h3 className="font-black text-white text-sm mt-1">{movie.title}</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                           <span className="text-[9px] font-black px-2 py-0.5 bg-teal-500/10 text-teal-500 rounded-full border border-teal-500/20">{movie.type}</span>
                           <span className="text-[9px] font-black px-2 py-0.5 bg-purple-500/10 text-purple-500 rounded-full border border-purple-500/20">{movie.category}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 py-2 bg-white/5 border border-white/5 rounded-xl text-[10px] font-black hover:bg-white/10 transition-colors">Edit</button>
                        <button onClick={() => handleDelete(movie.id)} className="flex-1 py-2 bg-red-600/10 text-red-500 border border-red-600/20 rounded-xl text-[10px] font-black hover:bg-red-600/20 transition-colors">Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto pb-20">
             <div className="mb-6">
                <h2 className="text-sm font-black text-gray-500 uppercase tracking-widest">User Base</h2>
             </div>
            <table className="w-full text-left text-[11px] border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-white/5 text-gray-600 font-black uppercase tracking-[0.2em]">
                  <th className="py-4 px-2">Name</th>
                  <th className="py-4 px-2">Contact Info</th>
                  <th className="py-4 px-2 text-center">Coin</th>
                  <th className="py-4 px-2">Plan</th>
                  <th className="py-4 px-2">Signed Up</th>
                  <th className="py-4 px-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id} className={`border-b border-white/5 transition-all ${user.isBlocked ? 'opacity-30' : 'hover:bg-white/[0.02]'}`}>
                    <td className="py-5 px-2 font-black text-white text-xs">{user.name}</td>
                    <td className="py-5 px-2">
                       <div className="flex flex-col">
                          <span className="text-gray-400 font-medium">{user.email !== '-' ? user.email : 'No Email'}</span>
                          <span className="text-[9px] text-gray-600">{user.phone !== '-' ? user.phone : 'No Phone'}</span>
                       </div>
                    </td>
                    <td className="py-5 px-2 text-center">
                       <div className="flex items-center justify-center gap-1.5">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full shadow-[0_0_5px_rgba(234,179,8,0.5)]" />
                          <span className="font-black text-white">{user.coins}</span>
                       </div>
                    </td>
                    <td className="py-5 px-2">
                       <span className={`px-2 py-0.5 rounded-full text-[9px] font-black border ${user.plan === 'VIP' ? 'bg-purple-500/10 text-purple-500 border-purple-500/20' : 'bg-white/5 text-gray-500 border-white/10'}`}>
                        {user.plan}
                       </span>
                    </td>
                    <td className="py-5 px-2 text-gray-500 font-medium">{user.createdAt}</td>
                    <td className="py-5 px-2 text-right">
                      <button 
                        onClick={() => handleToggleBlock(user.id, user.isBlocked)} 
                        className={`px-4 py-2 rounded-xl text-[9px] font-black tracking-widest uppercase transition-all ${user.isBlocked ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}
                      >
                        {user.isBlocked ? 'Unblock' : 'Blokir'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showAddModal && (
        <SeriesModal 
          onClose={() => setShowAddModal(false)} 
          onSave={async (data) => {
            await api.addSeries(data);
            setShowAddModal(false);
            fetchData();
          }} 
        />
      )}
    </div>
  );
};

export default AdminPanel;
