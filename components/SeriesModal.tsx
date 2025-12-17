
import React, { useState, useEffect } from 'react';
import { Movie } from '../types';

interface SeriesModalProps {
  movie?: Movie | null;
  onClose: () => void;
  onSave: (movie: Movie) => void;
}

const SeriesModal: React.FC<SeriesModalProps> = ({ movie, onClose, onSave }) => {
  const [formData, setFormData] = useState<Partial<Movie>>({
    title: '',
    description: '',
    category: 'TV SERIES',
    tag: 'Agogo Production',
    type: 'Exclusive',
    totalEpisodes: 10,
    freeEpisodes: 1,
    isFree: false,
    isActive: true,
    isRecommended: false,
    image: 'https://picsum.photos/seed/new/400/600',
    poster: 'https://picsum.photos/seed/post/400/600',
    coverVideo: 'https://picsum.photos/seed/cover/400/600',
    views: 0,
    createdAt: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  });

  useEffect(() => {
    if (movie) setFormData(movie);
  }, [movie]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData as Movie,
      id: movie?.id || Math.random().toString(36).substr(2, 9)
    });
  };

  return (
    <div className="fixed inset-0 z-[400] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-[#1a1a1a] rounded-[32px] border border-white/10 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h2 className="text-xl font-black text-white tracking-tighter">{movie ? 'Edit Series' : 'Add Series'}</h2>
          <button onClick={onClose} className="p-2 bg-orange-600 rounded-lg text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-6 pb-20">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest ml-1">Title</label>
            <input 
              required
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              placeholder="Enter title" 
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white outline-none focus:border-orange-500/50" 
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest ml-1">Descriptions</label>
            <textarea 
              required
              rows={3}
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              placeholder="Enter Descriptions" 
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white outline-none focus:border-orange-500/50 resize-none" 
            />
          </div>

          {/* Select Category */}
          <div className="space-y-2">
            <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest ml-1">Select Category</label>
            <select 
              value={formData.category}
              onChange={e => setFormData({...formData, category: e.target.value as any})}
              className="w-full bg-[#121212] border border-white/10 rounded-2xl px-5 py-3.5 text-white outline-none appearance-none"
            >
              <option value="MOVIES">MOVIES</option>
              <option value="ORIGINAL">ORIGINAL</option>
              <option value="TV SERIES">TV SERIES</option>
            </select>
          </div>

          {/* Select Tag */}
          <div className="space-y-2">
            <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest ml-1">Select Tag</label>
            <select 
              value={formData.tag}
              onChange={e => setFormData({...formData, tag: e.target.value})}
              className="w-full bg-[#121212] border border-white/10 rounded-2xl px-5 py-3.5 text-white outline-none appearance-none"
            >
              <option value="786 Production">786 Production</option>
              <option value="Agogo Production">Agogo Production</option>
              <option value="Dracun">Dracun</option>
              <option value="Dramabox">Dramabox</option>
              <option value="Japri Studios">Japri Studios</option>
              <option value="Local Studio">Local Studio</option>
            </select>
          </div>

          {/* Select Type */}
          <div className="space-y-2">
            <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest ml-1">Select Type</label>
            <select 
              value={formData.type}
              onChange={e => setFormData({...formData, type: e.target.value as any})}
              className="w-full bg-[#121212] border border-white/10 rounded-2xl px-5 py-3.5 text-white outline-none appearance-none"
            >
              <option value="Exclusive">Exclusive</option>
              <option value="Interactive">Interactive</option>
            </select>
          </div>

          {/* Episodes Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest ml-1">Total Episode</label>
              <input 
                type="number"
                value={formData.totalEpisodes}
                onChange={e => setFormData({...formData, totalEpisodes: parseInt(e.target.value)})}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white outline-none" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest ml-1">Free Episode</label>
              <input 
                type="number"
                value={formData.freeEpisodes}
                onChange={e => setFormData({...formData, freeEpisodes: parseInt(e.target.value)})}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white outline-none" 
              />
            </div>
          </div>

          {/* Toggles */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest ml-1">Free</label>
              <select 
                value={formData.isFree ? 'Yes' : 'No'}
                onChange={e => setFormData({...formData, isFree: e.target.value === 'Yes'})}
                className="w-full bg-[#121212] border border-white/10 rounded-2xl px-5 py-3.5 text-white outline-none"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest ml-1">Recommended</label>
              <select 
                value={formData.isRecommended ? 'Yes' : 'No'}
                onChange={e => setFormData({...formData, isRecommended: e.target.value === 'Yes'})}
                className="w-full bg-[#121212] border border-white/10 rounded-2xl px-5 py-3.5 text-white outline-none"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>

          {/* Media Upload Placeholders */}
          <div className="grid grid-cols-3 gap-3">
            {['Thumbnail', 'Cover Video', 'Poster'].map(type => (
              <div key={type} className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{type}</label>
                <div className="aspect-[4/5] bg-white/5 border border-dashed border-white/20 rounded-2xl flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors">
                  <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                </div>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent pointer-events-none">
            <button 
              type="submit"
              className="pointer-events-auto w-full py-4 bg-orange-600 text-white rounded-[24px] font-black text-base shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z"/></svg>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SeriesModal;
