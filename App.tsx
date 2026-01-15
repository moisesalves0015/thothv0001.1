
import React, { useState } from 'react';
import SidebarFeed from './components/SidebarFeed';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import UtilityHeader from './components/UtilityHeader';

const App: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* Topbar - Mobile/Tablet */}
      <Topbar />

      {/* Sidebar - Desktop */}
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      {/* 
        Main Content:
        - pt-[76px] no mobile (Topbar 64px + 12px de respiro)
        - No desktop lg:pt-[16px]
      */}
      <main 
        className={`flex-1 transition-all duration-300 min-h-screen pt-[76px] lg:pt-[16px] 
          ${isCollapsed ? 'lg:ml-[80px]' : 'lg:ml-[280px]'} ml-0`}
      >
        <div className="flex flex-col w-full mx-auto px-[16px] md:px-0 
          max-w-[350px] md:max-w-[660px] lg:max-w-[1005px]">
          
          {/* Utility Header - Fica no topo de tudo no conteúdo principal */}
          <UtilityHeader />

          <div className="flex flex-col gap-[24px] mt-0">
            <div className="flex flex-col gap-[2px] px-[8px] md:px-0">
               <h1 className="text-[28px] md:text-[32px] font-black text-slate-900 tracking-tight leading-tight">
                 Bem-vindo, Moisés
               </h1>
               <p className="text-slate-500 text-[14px]">Confira o que há de novo na Thoth.</p>
            </div>

            {/* Seção do Feed */}
            <section className="w-full h-[420px]">
              <SidebarFeed title="Feed" />
            </section>

            <footer className="text-center py-[32px]">
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Thoth Creative Suite • 2024</p>
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
