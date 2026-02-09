import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { User, Award, Activity, PieChart, Star, LogOut } from 'lucide-react';

const ProfilePage = () => {
  const [stats, setStats] = useState({ total: 0, avgPuan: 0, topBrand: '-' });
  
  // LocalStorage'dan kullanıcı bilgilerini çekiyoruz
  const userName = localStorage.getItem('user_name') || 'Misafir Kullanıcı';
  const userRole = localStorage.getItem('user_role') === 'member' ? 'Premium Analist' : 'Standart Analist';

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/history');
        if (res.data.length > 0) {
          const total = res.data.length;
          const avg = Math.round(res.data.reduce((acc, curr) => acc + curr.puan, 0) / total);
          const top = res.data.sort((a, b) => b.puan - a.puan)[0].brand_name;
          setStats({ total, avgPuan: avg, topBrand: top });
        }
      } catch (e) { 
        console.error("İstatistikler yüklenirken hata oluştu:", e); 
      }
    };
    fetchStats();
  }, []);

  // Çıkış Yapma Fonksiyonu: Tüm verileri temizler ve ana sayfaya döner
  const handleLogout = () => {
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_name');
    alert("Başarıyla çıkış yapıldı.");
    window.location.href = "/"; 
  };

  return (
    <div className="p-12 lg:p-20 min-h-screen bg-[#F9FAFB]">
      {/* Profil Başlık ve Çıkış Butonu */}
      <div className="flex items-center justify-between mb-16">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-[2.5rem] bg-gradient-to-br from-[#10B981] to-[#3B82F6] flex items-center justify-center text-white shadow-2xl transition-transform hover:scale-105">
            <User size={48} />
          </div>
          <div>
            <h1 className="text-4xl font-black text-gray-900 font-manrope">{userName}</h1>
            <p className="text-[#10B981] font-bold uppercase tracking-widest text-sm mt-1">{userRole}</p>
          </div>
        </div>
        
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl border-2 border-red-50 text-red-500 font-bold hover:bg-red-50 hover:border-red-100 transition-all active:scale-95 shadow-sm"
        >
          <LogOut size={20} />
          Oturumu Kapat
        </button>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="p-8 bg-white rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
          <Activity className="text-[#10B981] mb-4 group-hover:scale-110 transition-transform" size={32} />
          <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">Toplam Analiz</p>
          <h3 className="text-4xl font-black text-gray-900 mt-2">{stats.total}</h3>
        </div>
        <div className="p-8 bg-white rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
          <PieChart className="text-[#3B82F6] mb-4 group-hover:scale-110 transition-transform" size={32} />
          <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">Ortalama Puan</p>
          <h3 className="text-4xl font-black text-gray-900 mt-2">%{stats.avgPuan}</h3>
        </div>
        <div className="p-8 bg-white rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
          <Award className="text-orange-500 mb-4 group-hover:scale-110 transition-transform" size={32} />
          <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">En İyi Marka</p>
          <h3 className="text-4xl font-black text-gray-900 mt-2 truncate">{stats.topBrand}</h3>
        </div>
      </div>

      {/* Rozetler / Başarılar Paneli */}
      <div className="p-10 bg-black rounded-[3rem] text-white overflow-hidden relative shadow-2xl shadow-black/20">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6 text-[#10B981]">
            <Star size={24} fill="currentColor" />
            <h4 className="font-bold uppercase tracking-widest text-sm">Başarı Seviyesi</h4>
          </div>
          <h2 className="text-3xl font-bold mb-4">Doğa Koruyucusu</h2>
          <p className="text-gray-400 leading-relaxed max-w-md font-medium">
            Yaptığınız analizlerle sürdürülebilir markaların fark edilmesine katkı sağlıyorsunuz. 
            {stats.total >= 5 ? (
              <span className="text-[#10B981] block mt-2 font-bold animate-pulse">✓ 5 analiz sınırını geçtiniz! Yeni rütbe: Doğa Elçisi</span>
            ) : (
              <span className="block mt-2">Bir sonraki rozet için son {5 - stats.total} analiz kaldı.</span>
            )}
          </p>
        </div>
        <div className="absolute right-[-10%] bottom-[-20%] w-64 h-64 bg-[#10B981] opacity-20 blur-[80px] rounded-full animate-pulse" />
      </div>

      {/* Sorumluluk Reddi ve Sürüm Bilgisi */}
      <div className="mt-16 text-center text-gray-300 text-[10px] uppercase font-bold tracking-widest">
        GreenScan AI v2.5.0 SaaS Pro • 2026
      </div>
    </div>
  );
};

export default ProfilePage;