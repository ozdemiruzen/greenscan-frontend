import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  History, 
  User, 
  Leaf, 
  MoreHorizontal, 
  ChevronLeft, 
  LogIn, 
  CreditCard 
} from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Menü elemanları ve yönlendirilecekleri sayfalar
  const menuItems = [
    { icon: Home, label: 'Ana Sayfa', path: '/' },
    { icon: History, label: 'Geçmiş', path: '/history' },
    { icon: User, label: 'Profil', path: '/profile' },
    { icon: LogIn, label: 'Giriş Yap', path: '/auth' }, // Yeni sayfa
    { icon: CreditCard, label: 'Paketler', path: '/pricing' }, // Yeni sayfa
  ];

  return (
    <div className={`h-screen fixed left-0 top-0 bg-[#0F1115] flex flex-col transition-all duration-300 z-50 shadow-2xl ${isOpen ? 'w-[280px] p-6' : 'w-20 p-4'}`}>
      
      {/* Üst Kısım: Logo ve Kapatma Butonu */}
      <div className="flex items-center justify-between mb-12">
        {isOpen && (
          <div className="flex items-center gap-3 animate-in fade-in duration-500">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#10B981] to-[#3B82F6] flex items-center justify-center shadow-lg shadow-[#10B981]/20">
              <Leaf className="text-white" size={24} />
            </div>
            <h1 className="text-xl font-bold font-manrope text-white tracking-tight">GreenScan AI</h1>
          </div>
        )}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`p-2 rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all ${!isOpen ? 'mx-auto' : ''}`}
        >
          {isOpen ? <ChevronLeft size={20} /> : <MoreHorizontal size={24} />}
        </button>
      </div>

      {/* Menü Linkleri */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <div 
              key={index}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-4 p-3.5 rounded-xl cursor-pointer transition-all group ${
                isActive 
                ? 'bg-[#10B981]/10 text-[#10B981]' 
                : 'text-gray-500 hover:bg-white/5 hover:text-gray-300'
              }`}
            >
              <item.icon size={22} className={isActive ? 'text-[#10B981]' : 'group-hover:scale-110 transition-transform duration-300'} />
              {isOpen && (
                <span className="font-bold tracking-tight animate-in slide-in-from-left-2 duration-500">
                  {item.label}
                </span>
              )}
            </div>
          );
        })}
      </nav>

      {/* Alt Kısım: Sürüm Bilgisi veya Mini Logo */}
      <div className="mt-auto">
        {isOpen ? (
          <div className="p-4 bg-white/5 rounded-2xl border border-white/5 animate-in fade-in duration-700">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Sistem Aktif</p>
            </div>
            <p className="text-white font-medium text-sm">v2.5.0 SaaS Pro</p>
          </div>
        ) : (
          <div className="mx-auto text-[#10B981]/50 hover:text-[#10B981] transition-colors cursor-help">
            <Leaf size={20} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;