import React, { useState, useEffect } from 'react';
import { Search, Sparkles, Leaf, ShieldCheck, AlertCircle, CheckCircle2, Download, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const AnalysisPage = () => {
  const { token, loginAsGuest } = useAuth();
  const [brand, setBrand] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [mode, setMode] = useState('eco');
  const [userStats, setUserStats] = useState({ remaining: 3, role: 'guest' });

  const isLoggedIn = localStorage.getItem('user_id');
  const firstName = localStorage.getItem('user_name') || '';

  useEffect(() => {
    const fetchStatus = async () => {
      const userId = localStorage.getItem('user_id') || 'guest_user';
      try {
        const res = await axios.get(`http://localhost:8000/api/user-status/${userId}`);
        setUserStats({ remaining: res.data.remaining, role: res.data.role });
      } catch (e) { 
        console.error("Statü bilgisi güncellenemedi", e); 
      }
    };
    fetchStatus();
  }, [result]); 

  const downloadPDF = async () => {
    const element = document.getElementById('report-card');
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`GreenScan_Analiz_${result.brand_name}.pdf`);
  };

  const handleSearch = async () => {
    if (!brand.trim()) return;
    setLoading(true);
    setResult(null);
    const currentUserId = localStorage.getItem('user_id') || 'guest_user';
    try {
      if (!token) await loginAsGuest();
      const response = await axios.post('http://localhost:8000/api/analyze', { 
        brand_name: brand, mode: mode, user_id: currentUserId 
      });
      if (response.data.error) { alert(response.data.error); return; }
      setResult(response.data);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  return (
    <div className="p-8 lg:p-12 flex flex-col items-center min-h-screen bg-[#F9FAFB]">
      
      {/* BAŞLIK: Ne devasa ne küçük, Pro-SaaS dengesi (text-4xl/5xl) */}
      <div className="text-center mb-10 mt-10 animate-in fade-in slide-in-from-top-4 duration-700 w-full max-w-4xl">
        <h1 className="text-4xl lg:text-5xl font-black mb-5 bg-gradient-to-r from-[#10B981] to-[#3B82F6] bg-clip-text text-transparent font-manrope leading-relaxed py-2 tracking-tight">
  {isLoggedIn 
    ? `Merhaba ${firstName}, bugün neyi inceleyelim?` 
    : "Akıllı Marka Analizi"}
</h1>
        <p className="text-gray-400 text-base font-medium italic opacity-80">
          Yapay zeka ile sürdürülebilirlik ve güvenlik denetimi parmaklarınızın ucunda.
        </p>
      </div>

      {/* MOD SEÇİCİ */}
      <div className="flex gap-3 mb-10 p-1.5 bg-gray-200/50 rounded-2xl shadow-inner">
        <button onClick={() => setMode('eco')} className={`flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${mode === 'eco' ? 'bg-white text-[#10B981] shadow-md scale-105' : 'text-gray-500 hover:text-gray-700'}`}>
          <Leaf size={18} /> Doğa Dostu
        </button>
        <button onClick={() => setMode('safety')} className={`flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${mode === 'safety' ? 'bg-white text-[#3B82F6] shadow-md scale-105' : 'text-gray-500 hover:text-gray-700'}`}>
          <ShieldCheck size={18} /> Güvenli Alışveriş
        </button>
      </div>

      {/* ARAMA ÇUBUĞU: İstediğin gibi max-w-2xl ve h-20 ile daha geniş hale getirildi */}
      <div className="relative w-full max-w-2xl group shadow-sm rounded-full">
        <input 
          className="w-full h-20 px-10 rounded-full bg-white outline-none text-xl border-2 border-transparent focus:border-[#10B981]/15 transition-all placeholder:text-gray-300" 
          placeholder={mode === 'eco' ? "Marka adı girin..." : "Mağaza adı girin..."}
          value={brand} 
          onChange={(e) => setBrand(e.target.value)} 
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button onClick={handleSearch} disabled={loading} className={`absolute right-3 top-3 h-14 px-10 rounded-full flex items-center gap-2 font-black tracking-wide transition-all ${loading ? 'bg-gray-400' : 'bg-black text-white active:scale-95 shadow-lg'}`}>
          {loading ? <Sparkles size={20} className="animate-spin" /> : <Search size={22} />}
          <span className="text-sm">{loading ? 'Analiz...' : 'ANALİZ ET'}</span>
        </button>
      </div>

      {/* SONUÇ KARTI */}
      {result && (
        <div className="mt-12 w-full max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-500">
          <div id="report-card" className="p-10 border border-gray-100 rounded-[3.5rem] bg-white shadow-2xl relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-40 h-40 opacity-5 -mr-10 -mt-10 rounded-full ${mode === 'eco' ? 'bg-[#10B981]' : 'bg-[#3B82F6]'}`} />
            
            <div className="flex justify-between items-start mb-8 relative z-10">
              <div>
                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full ${mode === 'eco' ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-[#3B82F6]/10 text-[#3B82F6]'}`}>
                  {mode === 'eco' ? 'Ekolojik Rapor' : 'Güvenlik Raporu'}
                </span>
                <h2 className="text-3xl font-black mt-3 text-gray-900 leading-tight tracking-normal">{result.brand_name}</h2>
              </div>
              <div className="text-right">
                <div className={`text-5xl font-black ${result.puan > 80 ? 'text-[#10B981]' : 'text-orange-500'}`}>
                  {result.puan}<span className="text-xl text-gray-400 font-medium">/100</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-5 p-7 bg-gray-50/50 rounded-3xl border border-gray-100 mb-8 backdrop-blur-sm">
              <div className={`p-3 rounded-xl bg-white shadow-sm ${mode === 'eco' ? 'text-[#10B981]' : 'text-[#3B82F6]'}`}>
                {result.puan > 80 ? <CheckCircle2 size={26} /> : <AlertCircle size={26} />}
              </div>
              <div className="flex-1 text-left">
                <h4 className="font-bold text-gray-400 mb-1.5 text-xs uppercase tracking-wider">Yapay Zeka Özeti</h4>
                <p className="text-gray-700 font-semibold text-base leading-relaxed tracking-normal">{result.tespit}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="p-5 bg-gray-50/50 rounded-2xl border border-gray-100 text-center">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1.5 tracking-widest">Risk Durumu</p>
                <p className="text-lg font-black text-gray-900">{result.risk}</p>
              </div>
              <div className="p-5 bg-gray-50/50 rounded-2xl border border-gray-100 text-center">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1.5 tracking-widest">Kalan Hak</p>
                <p className="text-lg font-black text-gray-900">{userStats.remaining}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-8 px-6">
            <button onClick={downloadPDF} className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-black transition-all group">
              <Download size={20} className="group-hover:translate-y-0.5 transition-transform" /> 
              PDF Arşivle
            </button>
            
            {userStats.remaining === 0 && (
              <button onClick={() => window.location.href='/pricing'} className="flex items-center gap-2 text-sm font-bold text-[#3B82F6] hover:underline animate-bounce">
                <Lock size={18} /> Limit Doldu! Pro'ya Geç
              </button>
            )}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="mt-auto py-14 text-center w-full max-w-3xl border-t border-gray-100 opacity-60">
        <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.3em] mb-4">
          © 2026 GreenScan AI • Sürdürülebilirlik Ağı
        </p>
        <p className="text-[10px] text-gray-400 leading-relaxed font-medium italic px-12">
          * Yapay zeka tarafından üretilen sonuçlar birer **öneridir**; kesinlik taahhüt etmez.
        </p>
      </footer>
    </div>
  );
};

export default AnalysisPage;