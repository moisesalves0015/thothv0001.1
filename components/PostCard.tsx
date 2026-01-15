
import React, { useState, useRef, useEffect } from 'react';
import { Post } from '../types';
import ImageModal from './ImageModal';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [modalData, setModalData] = useState<{ images: string[], index: number } | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const isLongText = post.content.length > 150;

  const openModal = (idx: number) => {
    setModalData({ images: post.images, index: idx });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const renderCollage = () => {
    const imgCount = post.images.length;
    if (imgCount === 0) return null;

    if (imgCount === 1) {
      return (
        <div className="w-full h-36 mb-3 cursor-pointer overflow-hidden rounded-xl border border-slate-100" onClick={() => openModal(0)}>
          <img src={post.images[0]} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" alt="Publicação" />
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 gap-1 mb-3 h-36 overflow-hidden rounded-xl">
        <div className="h-full cursor-pointer overflow-hidden" onClick={() => openModal(0)}>
          <img src={post.images[0]} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" alt="Principal" />
        </div>
        <div className="grid grid-cols-2 gap-1 h-full">
           {post.images.slice(1, 5).map((img, idx) => (
             <div key={idx} className="relative h-full cursor-pointer overflow-hidden" onClick={() => openModal(idx + 1)}>
               <img src={img} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" alt={`Galeria ${idx}`} />
               {idx === 3 && imgCount > 5 && (
                 <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px]">
                   <span className="text-white font-bold text-[10px]">+{imgCount - 4}</span>
                 </div>
               )}
             </div>
           ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="flex-shrink-0 w-[290px] h-[345px] flex flex-col bg-white/75 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-white/90 snap-center hover:shadow-lg transition-all duration-300 relative">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-3 h-10 flex-shrink-0 relative">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <img src={post.author.avatar} className="w-9 h-9 rounded-full object-cover border border-white shadow-sm flex-shrink-0" alt={post.author.name} />
            <div className="flex flex-col min-w-0">
              <h4 className="text-[13px] font-bold text-slate-900 leading-tight truncate">{post.author.name}</h4>
              <span className="text-[10px] text-slate-500 truncate">{post.author.username}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1 flex-shrink-0" ref={menuRef}>
            <button 
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-1.5 rounded-lg transition-all active:scale-90 ${isBookmarked ? 'text-[#006c55] bg-[#006c55]/10' : 'text-slate-300 hover:text-slate-500'}`}
            >
              <svg className="w-4 h-4" fill={isBookmarked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
              </svg>
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-1.5 rounded-lg transition-all active:scale-90 ${isMenuOpen ? 'text-slate-900 bg-slate-100' : 'text-slate-300 hover:text-slate-600'}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 top-11 w-52 bg-white/95 backdrop-blur-2xl border border-white/40 rounded-2xl shadow-xl z-50 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                <button className="w-full flex items-center gap-3 px-4 py-2 text-[12px] font-medium text-slate-700 hover:bg-slate-50 text-left">Compartilhar</button>
                <button className="w-full flex items-center gap-3 px-4 py-2 text-[12px] font-medium text-slate-700 hover:bg-slate-50 text-left">Copiar link</button>
                <div className="h-px bg-slate-100 my-1 mx-4"></div>
                <button className="w-full flex items-center gap-3 px-4 py-2 text-[12px] font-bold text-red-500 hover:bg-red-50 text-left">Denunciar</button>
              </div>
            )}
          </div>
        </div>

        {/* Media Collage */}
        {renderCollage()}

        {/* Content Area - Scroll interno quando expandido */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="relative flex-1 min-h-0 flex flex-col">
            <div className={`text-[13px] text-slate-700 leading-relaxed custom-scrollbar transition-all ${isExpanded ? 'overflow-y-auto pr-1 flex-1' : 'line-clamp-4'}`}>
              {post.content}
            </div>
            
            {isLongText && (
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-[10px] font-bold text-[#006c55] mt-1 hover:underline text-left"
              >
                {isExpanded ? 'Ver menos' : 'Ler mais'}
              </button>
            )}
          </div>

          {/* Hashtags fixas no rodapé do card */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2 pt-2 border-t border-slate-100/50 flex-shrink-0">
              {post.tags.slice(0, 4).map(tag => (
                <span key={tag} className="text-[8px] font-extrabold text-[#006c55] bg-[#006c55]/5 px-1.5 py-0.5 rounded-md uppercase tracking-wider">#{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      {modalData && (
        <ImageModal 
          images={modalData.images} 
          initialIndex={modalData.index}
          onClose={() => setModalData(null)} 
        />
      )}
    </>
  );
};

export default PostCard;
