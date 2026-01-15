
import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  MessageCircle, 
  Bell, 
  ChevronLeft, 
  User, 
  Settings, 
  LifeBuoy, 
  LogOut, 
  ChevronDown 
} from 'lucide-react';

const UtilityHeader: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsCount, setNotificationsCount] = useState(3);
  const [messagesCount, setMessagesCount] = useState(2);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=Moisés";
  const userName = "Moises Alves";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-[40] flex items-center justify-between h-[80px] w-full px-0 mb-2 bg-transparent gap-3 md:gap-5">
      {/* Esquerda - Botão Voltar (Altura fixa para alinhar) */}
      <div className="flex items-center flex-shrink-0 h-12">
        <button 
          onClick={() => window.history.back()}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-white/60 backdrop-blur-md border border-white/80 text-slate-700 hover:bg-[#006c55] hover:text-white transition-all shadow-sm active:scale-90"
          title="Voltar"
        >
          <ChevronLeft size={22} />
        </button>
      </div>

      {/* Centro - Barra de Busca Expandida (Altura h-12 para alinhar) */}
      <div className="flex-1 relative h-12">
        <form onSubmit={(e) => e.preventDefault()} className="relative flex items-center w-full h-full">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Buscar em Thoth..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-full pl-6 pr-14 rounded-full bg-white/60 backdrop-blur-md border border-white/80 focus:outline-none focus:ring-2 focus:ring-[#006c55]/20 focus:border-[#006c55] transition-all text-sm md:text-base text-slate-900 placeholder-slate-400 shadow-sm"
          />
          <div className="absolute right-14 hidden sm:flex items-center gap-1 opacity-40">
            <kbd className="px-1.5 py-0.5 text-[10px] font-sans bg-slate-100 border border-slate-200 rounded">Ctrl</kbd>
            <kbd className="px-1.5 py-0.5 text-[10px] font-sans bg-slate-100 border border-slate-200 rounded">K</kbd>
          </div>
          <button className="absolute right-0 w-12 h-12 rounded-full bg-gradient-to-tr from-[#006c55] to-[#00876a] text-white flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-[#006c55]/20 border-none">
            <Search size={20} />
          </button>
        </form>
      </div>

      {/* Direita - Ações (Alinhamento h-12) */}
      <div className="flex items-center gap-2 md:gap-3 flex-shrink-0 h-12">
        <button className="relative w-12 h-12 flex items-center justify-center rounded-full bg-white/60 backdrop-blur-md border border-white/80 text-slate-700 hover:bg-[#006c55] hover:text-white transition-all group active:scale-95 shadow-sm">
          <MessageCircle size={22} />
          {messagesCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white animate-bounce">
              {messagesCount}
            </span>
          )}
        </button>

        <button className="relative w-12 h-12 flex items-center justify-center rounded-full bg-white/60 backdrop-blur-md border border-white/80 text-slate-700 hover:bg-[#006c55] hover:text-white transition-all group active:scale-95 shadow-sm">
          <Bell size={22} />
          {notificationsCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white animate-bounce">
              {notificationsCount}
            </span>
          )}
        </button>

        {/* Perfil - Visível APENAS no PC (lg+) */}
        <div className="relative hidden lg:flex items-center h-12 ml-2" ref={dropdownRef}>
          <button 
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-[#006c55]/10 transition-all active:scale-95 border border-transparent hover:border-white/50"
          >
            <img src={userAvatar} className="w-9 h-9 rounded-full border-2 border-white shadow-sm object-cover" alt="Perfil" />
            <span className="text-sm font-semibold text-slate-900 whitespace-nowrap">{userName}</span>
            <ChevronDown size={16} className={`text-slate-400 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {profileDropdownOpen && (
            <div className="absolute right-0 top-full mt-3 w-52 bg-white/95 backdrop-blur-xl border border-white/40 rounded-2xl shadow-2xl py-2 animate-in fade-in slide-in-from-top-4 duration-300 z-50">
              <div className="px-4 py-2 border-b border-slate-50 mb-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Minha Conta</p>
              </div>
              <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-[#006c55]/5 hover:text-[#006c55] transition-all">
                <User size={16} /> Meu Perfil
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-[#006c55]/5 hover:text-[#006c55] transition-all">
                <Settings size={16} /> Configurações
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-[#006c55]/5 hover:text-[#006c55] transition-all">
                <LifeBuoy size={16} /> Suporte
              </a>
              <div className="h-px bg-slate-100 my-2 mx-4"></div>
              <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 transition-all">
                <LogOut size={16} /> Sair
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default UtilityHeader;
