
import React, { useState, useRef } from 'react';
import { SidebarConfig } from '../types';
import PostCard from './PostCard';
import NewPost from './NewPost';
import { MOCK_POSTS } from '../constants.tsx';

/**
 * SidebarFeed Component - Ajustado para navegação funcional via setas no desktop.
 */
const SidebarFeed: React.FC<SidebarConfig> = ({ title, maxPosts = 10 }) => {
  const [isPostModalOpen, setPostModalOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320; // Largura do card (280) + gap (24/40)
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative h-full flex flex-col glass-panel rounded-2xl overflow-hidden shadow-2xl">
      {/* Header Section */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-white/40 bg-white/20 flex-shrink-0 backdrop-blur-sm z-10">
        <div className="flex flex-col">
           <h2 className="text-lg font-black text-slate-900 tracking-tight leading-none">{title}</h2>
           <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-[#006c55] mt-1 opacity-80">atualizações</span>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setPostModalOpen(true)}
            className="flex items-center gap-2 bg-[#006c55] hover:bg-[#005a46] text-white px-4 py-2 rounded-xl text-[11px] font-bold transition-all shadow-lg shadow-[#006c55]/20 active:scale-95"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
            <span className="hidden sm:inline">Criar Publicação</span>
          </button>
          
          {/* Navegação por setas: Oculta no mobile (hidden), visível no desktop (md:flex) */}
          <div className="hidden md:flex gap-1.5">
            <button 
              onClick={() => handleScroll('left')}
              className="p-1.5 rounded-lg bg-white/60 text-[#006c55] hover:bg-white transition-all border border-white/90 shadow-sm active:scale-90"
              aria-label="Rolar para esquerda"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button 
              onClick={() => handleScroll('right')}
              className="p-1.5 rounded-lg bg-white/60 text-[#006c55] hover:bg-white transition-all border border-white/90 shadow-sm active:scale-90"
              aria-label="Rolar para direita"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Area - Funciona por deslize ou via Ref */}
      <div 
        ref={scrollContainerRef}
        className="flex items-center gap-6 overflow-x-auto px-6 py-4 snap-x snap-mandatory no-scrollbar flex-1 bg-gradient-to-b from-white/10 to-transparent scroll-smooth"
      >
        {MOCK_POSTS.slice(0, maxPosts).map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
        <div className="flex-shrink-0 w-8"></div>
      </div>

      {/* Modal agora ancorado no feed */}
      <NewPost isOpen={isPostModalOpen} onClose={() => setPostModalOpen(false)} />
      
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default SidebarFeed;
