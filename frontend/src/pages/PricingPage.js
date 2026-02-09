import React from 'react';
import { Check, Zap, Shield, Crown } from 'lucide-react';

const PricingPage = () => {
  const plans = [
    { name: 'Misafir', price: '0', limit: '3 Analiz', icon: Zap, color: 'gray' },
    { name: 'Üye', price: 'Ücretsiz', limit: '7 Analiz/Ay', icon: Shield, color: '[#10B981]', popular: true },
    { name: 'Pro', price: '149', limit: 'Sınırsız', icon: Crown, color: '[#3B82F6]' },
  ];

  return (
    <div className="p-12 lg:p-20 min-h-screen bg-[#F9FAFB]">
      <h1 className="text-5xl font-black text-center mb-16 font-manrope">Sana Uygun Paketi Seç</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, i) => (
          <div key={i} className={`p-10 rounded-[3rem] bg-white border-2 ${plan.popular ? 'border-[#10B981]' : 'border-gray-100'} shadow-xl relative overflow-hidden`}>
            {plan.popular && <span className="absolute top-6 right-[-35px] bg-[#10B981] text-white text-[10px] font-black px-10 py-1 rotate-45 uppercase">En Popüler</span>}
            <plan.icon className={`text-${plan.color} mb-6`} size={40} />
            <h3 className="text-2xl font-black mb-2">{plan.name}</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-black">{plan.price}</span>
              <span className="text-gray-400 font-bold">₺ / ay</span>
            </div>
            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-2 font-bold text-gray-600"><Check size={18} className="text-[#10B981]" /> {plan.limit}</li>
              <li className="flex items-center gap-2 font-bold text-gray-600"><Check size={18} className="text-[#10B981]" /> PDF Raporu</li>
            </ul>
            <button className={`w-full py-4 rounded-2xl font-black transition-all ${plan.name === 'Pro' ? 'bg-[#3B82F6] text-white shadow-lg' : 'bg-black text-white'}`}>
              {plan.name === 'Misafir' ? 'Zaten Kullanılıyor' : 'Hemen Başla'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;