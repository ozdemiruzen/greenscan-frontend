import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, User, Zap } from 'lucide-react';
import axios from 'axios';

// LOGO BİLEŞENİ: Doğrudan buraya ekledik ki hata vermesin
const BrandLogo = ({ size = 32 }) => (
  <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
    <div className="absolute inset-0 bg-gradient-to-br from-[#10B981] to-[#3B82F6] rounded-xl shadow-lg rotate-3" />
    <svg 
      width={size * 0.6} 
      height={size * 0.6} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="white" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className="relative z-10"
    >
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 8.5C18.5 14.5 15.5 19 11 20z" />
      <path d="M7 22c0-3 1-5 4-7" />
    </svg>
  </div>
);

const Navbar = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('user_id');
  const userName = localStorage.getItem('user_name') || 'Kullanıcı';
  const [status, setStatus] = useState({ remaining: 3, role: 'guest' });

  useEffect(() => {
    if (userId) {
      const fetchStatus = async () => {
        try {
          const res = await axios.get(`http://localhost:8000/api/user-status/${userId}`);
          setStatus({ remaining: res.data.remaining, role: res.data.role });
        } catch (e) { console.error(e); }
      };
      fetchStatus();
    }
  }, [userId]);

  return (
    <div className="fixed top-0 right-0 left-0 h-20 z-40 flex items-center justify-between px-12 pointer-events-none">
      
      {/* SOL TARAF: Logo ve Marka İsmi */}
      <div 
        className="flex items-center gap-3 pointer-events-auto cursor-pointer group" 
        onClick={() => navigate('/')}
      >
        <BrandLogo size={40} />
        <span className="text-xl font-black text-gray-900 font-manrope tracking-tighter group-hover:text-[#10B981] transition-colors">
          GreenScan <span className="text-[#10B981]">AI</span>
        </span>
      </div>

      {/* SAĞ TARAF: Kullanıcı Paneli */}
      <div className="flex items-center gap-4 pointer-events-auto bg-white/90 backdrop-blur-md p-2.5 rounded-2xl border border-white/20 shadow-xl shadow-black/5">
        
        <button 
          onClick={() => navigate('/pricing')}
          className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg shadow-orange-200 hover:scale-110 transition-all group"
          title="Premium Paketleri Gör"
        >
          <Zap size={18} fill="currentColor" className="group-hover:animate-pulse" />
        </button>

        <div className="w-[1px] h-8 bg-gray-100 mx-1" />

        {!userId ? (
          <button 
            onClick={() => navigate('/auth')} 
            className="px-6 py-2 bg-black text-white rounded-xl font-bold text-sm hover:bg-gray-800 transition-all shadow-md"
          >
            Giriş Yap
          </button>
        ) : (
          <div className="flex items-center gap-4 px-2">
            <div className="flex flex-col items-end">
              <span className="text-sm font-black text-gray-900 font-manrope">{userName}</span>
              <span className="text-[9px] font-bold text-[#10B981] uppercase tracking-tighter">
                Kalan Hak: {status.remaining}
              </span>
            </div>
            <div 
              onClick={() => navigate('/profile')}
              className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 cursor-pointer hover:bg-black hover:text-white transition-all border border-gray-100 shadow-sm"
            >
              <User size={20} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;