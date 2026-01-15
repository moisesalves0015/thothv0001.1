
import React, { useState, useRef, useEffect } from "react";
import { 
  User, 
  Settings, 
  LifeBuoy, 
  LogOut, 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Calendar,
  Search,
  Briefcase
} from 'lucide-react';

const avatarUrls = [
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Moisés",
    "https://i.pravatar.cc/100?img=32",
    "https://i.pravatar.cc/100?img=45"
];

interface ProfileDropdownProps {
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onSupportClick?: () => void;
  onLogoutClick?: () => void;
  isOpen?: boolean;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  onProfileClick,
  onSettingsClick,
  onSupportClick,
  onLogoutClick,
  isOpen = true,
}) => {
  if (!isOpen) return null;

  const handleClick = (e: React.MouseEvent, callback?: () => void) => {
    e.preventDefault();
    if (callback) callback();
  };

  return (
    <div className="absolute right-0 top-[50px] bg-white rounded-[16px] shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-black/5 min-w-[200px] p-[8px] z-[1002] flex flex-col animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="px-3 py-2 mb-1 border-bottom border-slate-50">
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Minha Conta</span>
      </div>
      <a 
        href="#" 
        onClick={(e) => handleClick(e, onProfileClick)}
        className="flex items-center gap-[12px] px-[12px] py-[10px] rounded-[10px] text-[14px] text-slate-700 no-underline hover:bg-[#006c55]/5 hover:text-[#006c55] transition-all font-medium"
      >
        <User size={18} />
        Meu Perfil
      </a>
      <a 
        href="#" 
        onClick={(e) => handleClick(e, onSettingsClick)}
        className="flex items-center gap-[12px] px-[12px] py-[10px] rounded-[10px] text-[14px] text-slate-700 no-underline hover:bg-[#006c55]/5 hover:text-[#006c55] transition-all font-medium"
      >
        <Settings size={18} />
        Configurações
      </a>
      <a 
        href="#" 
        onClick={(e) => handleClick(e, onSupportClick)}
        className="flex items-center gap-[12px] px-[12px] py-[10px] rounded-[10px] text-[14px] text-slate-700 no-underline hover:bg-[#006c55]/5 hover:text-[#006c55] transition-all font-medium"
      >
        <LifeBuoy size={18} />
        Suporte
      </a>
      <div className="h-px bg-slate-100 my-1 mx-2"></div>
      <a 
        href="#" 
        onClick={(e) => handleClick(e, onLogoutClick)}
        className="flex items-center gap-[12px] px-[12px] py-[10px] rounded-[10px] text-[14px] text-red-500 no-underline hover:bg-red-50 transition-all font-bold"
      >
        <LogOut size={18} />
        Sair da conta
      </a>
    </div>
  );
};

const Topbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const avatarAtual = avatarUrls[0];

    const mobileMenuItems = [
        { icon: LayoutDashboard, label: 'Página Inicial' },
        { icon: BookOpen, label: 'Disciplinas' },
        { icon: Users, label: 'Conexões' },
        { icon: Calendar, label: 'Eventos' },
        { icon: Search, label: 'Pesquisas' },
        { icon: Briefcase, label: 'Vagas' },
    ];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setProfileDropdownOpen(false);
            }
        };

        if (profileDropdownOpen) {
          document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [profileDropdownOpen]);

    const closeAll = () => {
      setMenuOpen(false);
      setProfileDropdownOpen(false);
    };

    return (
        <>
            {/* Fundo Escuro (Backdrop) */}
            {(menuOpen || profileDropdownOpen) && (
              <div 
                className="fixed inset-0 z-[999] bg-slate-900/40 backdrop-blur-[2px] animate-in fade-in duration-300"
                onClick={closeAll}
              />
            )}

            <header className={`fixed top-0 left-1/2 -translate-x-1/2 w-full z-[1000] bg-white/95 backdrop-blur-[12px] rounded-b-[16px] border border-white/60 shadow-[0_10px_30px_rgba(0,0,0,0.1)] lg:hidden transition-all duration-300 ${menuOpen ? 'rounded-b-[24px]' : ''}`}>
                {/* Barra principal fixa */}
                <div className="flex items-center justify-between px-[20px] h-[64px]">
                    <button
                        className={`text-[24px] bg-transparent cursor-pointer border-0 flex items-center justify-center w-[40px] h-[40px] text-slate-700 transition-transform ${menuOpen ? 'rotate-90' : ''}`}
                        onClick={() => {
                            setMenuOpen(!menuOpen);
                            setProfileDropdownOpen(false);
                        }}
                        aria-label="Abrir menu"
                    >
                        {menuOpen ? (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
                        ) : (
                          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
                        )}
                    </button>

                    <div className="font-black text-[#006c55] text-[24px] tracking-tighter">thoth</div>
                    
                    <div className="relative" ref={dropdownRef}>
                        <div 
                            className={`cursor-pointer transition-all active:scale-90 ${profileDropdownOpen ? 'ring-4 ring-[#006c55]/10 rounded-full' : ''}`}
                            onClick={() => {
                                setProfileDropdownOpen(!profileDropdownOpen);
                                setMenuOpen(false);
                            }}
                        >
                            <img
                                src={avatarAtual}
                                alt="Avatar do usuário"
                                className="w-[38px] h-[38px] rounded-full object-cover border-2 border-white shadow-md"
                            />
                        </div>
                        
                        <ProfileDropdown
                            isOpen={profileDropdownOpen}
                            onProfileClick={closeAll}
                            onSettingsClick={closeAll}
                            onSupportClick={closeAll}
                            onLogoutClick={closeAll}
                        />
                    </div>
                </div>

                {/* Menu Mobile Expandido */}
                <nav className={`flex flex-col gap-[4px] px-[12px] overflow-hidden transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${menuOpen ? "max-h-[85vh] py-[16px] border-t border-slate-100" : "max-h-0 py-0"}`}>
                    <div className="px-3 mb-2">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#006c55] opacity-60">Navegação</span>
                    </div>
                    {mobileMenuItems.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <a 
                                key={idx}
                                href="#" 
                                onClick={(e) => { e.preventDefault(); closeAll(); }}
                                className={`flex items-center gap-[14px] no-underline py-[12px] px-[16px] rounded-[12px] transition-all group ${idx === 0 ? 'bg-[#006c55]/5 text-[#006c55] font-bold' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'}`}
                            >
                                <Icon size={20} className={idx === 0 ? 'text-[#006c55]' : 'text-slate-400 group-hover:text-slate-600'} />
                                <span className="text-[15px]">{item.label}</span>
                                {idx === 0 && <div className="ml-auto w-1.5 h-1.5 bg-[#006c55] rounded-full animate-pulse"></div>}
                            </a>
                        );
                    })}
                </nav>
            </header>
        </>
    );
};

export default Topbar;
