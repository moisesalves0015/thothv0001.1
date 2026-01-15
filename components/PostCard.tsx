
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

  const isLongText = post.content.length > 130;

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
        <div className="w-full h-32 mb-3 cursor-pointer overflow-hidden rounded-xl border border-slate-100" onClick={() => openModal(0)}>
          <img src={post.images[0]} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" alt="Publicação" />
        </div>
      );
    }

    // Se tiver mais de uma imagem, usa o layout de 1 principal + grid lateral
    // Ajustado para 1 principal + 4 miniaturas (total 5 espaços)
    return (
      <div className="grid grid-cols-2 gap-1 mb-3 h-32 overflow-hidden rounded-xl">
        {/* Foto principal (Esquerda) */}
        <div className="h-full cursor-pointer overflow-hidden" onClick={() => openModal(0)}>
          <img src={post.images[0]} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" alt="Principal" />
        </div>
        
        {/* Grid de miniaturas (Direita) */}
        <div className="grid grid-cols-2 gap-1 h-full">
           {post.images.slice(1, 5).map((img, idx) => (
             <div key={idx} className="relative h-full cursor-pointer overflow-hidden" onClick={() => openModal(idx + 1)}>
               <img src={img} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" alt={`Galeria ${idx}`} />
               {/* O indicador +N agora aparece na 4ª miniatura lateral (que é a 5ª imagem total) */}
               {idx === 3 && imgCount > 5 && (
                 <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px]">
                   <span className="text-white font-bold text-[10px]">+{imgCount - 4}</span>
                 </div>
               )}
             </div>
           ))}
           {/* Preenchimento caso tenha menos de 5 fotos mas mais de 1 */}
           {imgCount === 2 && (
             <>
               <div className="bg-slate-100/50"></div>
               <div className="bg-slate-100/50"></div>
               <div className="bg-slate-100/50"></div>
             </>
           )}
           {imgCount === 3 && (
             <>
               <div className="bg-slate-100/50"></div>
               <div className="bg-slate-100/50"></div>
             </>
           )}
           {imgCount === 4 && (
               <div className="bg-slate-100/50"></div>
           )}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="flex-shrink-0 w-[280px] h-[320px] flex flex-col bg-white/70 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-white/90 snap-center hover:shadow-lg transition-all duration-300 relative">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-2.5 h-10 flex-shrink-0 relative">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <img src={post.author.avatar} className="w-8 h-8 rounded-full object-cover border border-white shadow-sm flex-shrink-0" alt={post.author.name} />
            <div className="flex flex-col min-0">
              <h4 className="text-sm font-bold text-slate-900 leading-tight truncate">{post.author.name}</h4>
              <span className="text-[10px] text-slate-500 truncate">{post.author.username}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-0.5 flex-shrink-0" ref={menuRef}>
            <button 
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-1.5 rounded-lg transition-all active:scale-90 ${isBookmarked ? 'text-[#006c55] bg-[#006c55]/10' : 'text-slate-300 hover:text-slate-500 hover:bg-slate-50'}`}
              title="Salvar"
            >
              <svg className="w-4 h-4" fill={isBookmarked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
              </svg>
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-1.5 rounded-lg transition-all active:scale-90 ${isMenuOpen ? 'text-slate-900 bg-slate-100 ring-2 ring-slate-100' : 'text-slate-300 hover:text-slate-600 hover:bg-slate-50'}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 top-11 w-52 bg-white/95 backdrop-blur-2xl border border-white/40 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] z-50 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-3 py-1.5 mb-1">
                   <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Opções</span>
                </div>

                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] font-medium text-slate-700 hover:bg-[#006c55]/5 hover:text-[#006c55] transition-all active:scale-[0.98]">
                  <div className="p-1.5 bg-slate-50 rounded-lg group-hover:bg-white transition-colors">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
                  </div>
                  Compartilhar
                </button>
                
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] font-medium text-slate-700 hover:bg-[#006c55]/5 hover:text-[#006c55] transition-all active:scale-[0.98]">
                  <div className="p-1.5 bg-slate-50 rounded-lg group-hover:bg-white transition-colors">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
                  </div>
                  Copiar link
                </button>

                <div className="h-px bg-slate-100 my-2 mx-4"></div>

                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] font-medium text-slate-500 hover:bg-slate-50 transition-all active:scale-[0.98]">
                  <div className="p-1.5 bg-slate-50 rounded-lg">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"/></svg>
                  </div>
                  Não tenho interesse
                </button>
                
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] font-bold text-red-500 hover:bg-red-50 transition-all active:scale-[0.98]">
                  <div className="p-1.5 bg-red-50 rounded-lg">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                  </div>
                  Denunciar publicação
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Media Collage */}
        {renderCollage()}

        {/* Content Area */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className={`relative flex-1 min-h-0 overflow-hidden ${isExpanded ? 'flex flex-col' : ''}`}>
            <div className={`text-sm text-slate-700 leading-relaxed custom-scrollbar ${isExpanded ? 'overflow-y-auto pr-1' : 'line-clamp-3'}`}>
              {post.content}
            </div>
            
            {isLongText && (
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className={`text-[11px] font-bold text-[#006c55] hover:underline mt-1 self-start ${isExpanded ? 'sticky bottom-0 py-1 w-full bg-white/60 backdrop-blur-sm text-left' : ''}`}
              >
                {isExpanded ? 'Ver menos' : 'Ler mais'}
              </button>
            )}
          </div>

          {post.tags && post.tags.length > 0 && !isExpanded && (
            <div className="flex flex-wrap gap-1.5 mt-auto pt-2 border-t border-slate-100/50">
              {post.tags.slice(0, 5).map(tag => (
                <span key={tag} className="text-[8px] font-extrabold text-[#006c55] bg-[#006c55]/5 px-1.5 py-0.5 rounded-md uppercase tracking-wider">#{tag}</span>
              ))}
              {post.tags.length > 5 && (
                <span className="text-[8px] font-black text-slate-400 px-1 py-0.5">+{post.tags.length - 5}</span>
              )}
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
