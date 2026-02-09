import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { History, Search } from 'lucide-react';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/history');
        setHistory(res.data);
      } catch (e) { console.error(e); }
    };
    fetchHistory();
  }, []);

  return (
    <div className="p-12 lg:p-20 min-h-screen bg-[#F9FAFB]">
      <div className="flex items-center gap-4 mb-12">
        <div className="p-3 bg-black text-white rounded-2xl shadow-lg">
          <History size={32} />
        </div>
        <h1 className="text-4xl font-black text-gray-900 font-manrope">Analiz Geçmişi</h1>
      </div>

      <div className="grid gap-6">
        {history.length > 0 ? history.map((item) => (
          <div key={item.id} className="p-6 bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all flex justify-between items-center group">
            <div className="flex items-center gap-6">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl ${item.puan > 80 ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-orange-100 text-orange-500'}`}>
                {item.puan}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 uppercase tracking-tight">{item.brand_name}</h3>
                <p className="text-sm font-bold text-gray-400 mt-1 uppercase tracking-widest">{item.mode}</p>
              </div>
            </div>
            <div className="text-right flex items-center gap-8">
              <div className="hidden md:block">
                <p className="text-xs font-bold text-gray-400 uppercase">Durum</p>
                <p className="font-bold text-gray-900">{item.risk}</p>
              </div>
              <button className="p-4 bg-gray-50 rounded-2xl text-gray-400 group-hover:bg-black group-hover:text-white transition-all">
                <Search size={20} />
              </button>
            </div>
          </div>
        )) : (
          <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200 text-gray-400">
            <p className="text-xl font-medium">Henüz bir analiz yapmadınız.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;