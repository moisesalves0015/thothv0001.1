
import React from 'react';
import {
    LayoutDashboard,
    BookOpen,
    Users,
    Calendar,
    Search,
    Briefcase,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
    const [activeItem, setActiveItem] = React.useState('Página Inicial');

    const menuItems = [
        { icon: LayoutDashboard, label: 'Página Inicial' },
        { icon: BookOpen, label: 'Disciplinas' },
        { icon: Users, label: 'Conexões' },
        { icon: Calendar, label: 'Eventos' },
        { icon: Search, label: 'Pesquisas' },
        { icon: Briefcase, label: 'Vagas' },
    ];

    const handleMenuItemClick = (label: string) => {
        setActiveItem(label);
        console.log(`Navegando para: ${label}`);
    };

    return (
        /* hidden lg:flex: Garante que o menu suma completamente abaixo de 1024px */
        <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''} hidden lg:flex`}>
            {/* Cabeçalho do Sidebar */}
            <div className="sidebar-header">
                <div className="sidebar-logo">thoth</div>
                <button
                    className="sidebar-toggle"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    aria-label={isCollapsed ? "Expandir sidebar" : "Recolher sidebar"}
                >
                    {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>

            {/* Menu de Navegação */}
            <nav className="sidebar-nav">
                {menuItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = activeItem === item.label;
                    
                    return (
                        <a
                            key={index}
                            href="#"
                            className={`sidebar-item ${isActive ? 'active' : ''}`}
                            onClick={(e) => {
                                e.preventDefault();
                                handleMenuItemClick(item.label);
                            }}
                        >
                            <div className="sidebar-item-content">
                                <Icon className="sidebar-icon" size={18} />
                                {!isCollapsed && (
                                    <span className="sidebar-item-label">{item.label}</span>
                                )}
                            </div>
                            {isActive && !isCollapsed && (
                                <div className="active-indicator" />
                            )}
                        </a>
                    );
                })}
            </nav>

            {/* Área do Perfil - Mantida vazia conforme solicitado */}
            <div className="sidebar-profile">
                <div className="profile-section">
                    <div className="profile-info">
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
