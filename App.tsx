
import React, { useState } from 'react';
import SidebarFeed from './components/SidebarFeed';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import UtilityHeader from './components/UtilityHeader';

const App: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-transparent">
      {/* Topbar - Mobile/Tablet */}
      <Topbar />

      {/* Sidebar - Desktop */}
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      {/* 
        Main Content Container:
        - pt-[72px] no mobile para encostar na Topbar de 64px com 8px de respiro.
        - bg-transparent para mostrar a imagem de fundo.
      */}
      <main 
        className={`flex-1 transition-all duration-300 min-h-screen pt-[72px] lg:pt-[24px] 
          ${isCollapsed ? 'lg:ml-[80px]' : 'lg:ml-[280px]'} ml-0 flex flex-col items-center`}
      >
        <div className="w-full px-4 md:px-6 lg:px-8 max-w-[1005px] flex flex-col">
          
          {/* Utility Header */}
          <UtilityHeader />

          <div className="flex flex-col gap-6 mt-0">
            <div className="flex flex-col gap-1">
               <h1 className="text-[28px] md:text-[32px] font-black text-slate-900 tracking-tight leading-tight">
                 Bem-vindo, Moisés
               </h1>
               <p className="text-slate-500 text-sm">Confira o que há de novo na Thoth.</p>
            </div>

            {/* Seção do Feed */}
            <section className="w-full min-h-[460px]">
              <SidebarFeed title="Feed" />
            </section>

            <footer className="text-center py-12">
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Thoth Creative Suite • 2024</p>
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
