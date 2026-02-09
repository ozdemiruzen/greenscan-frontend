import React, { useState } from 'react';
import { Mail, Lock, LogIn, UserPlus, User as UserIcon, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formData, setFormData] = useState({ firstName: '', lastName: '', age: '' });
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      // Backend'deki /login endpoint'ine istek atıyoruz
      // Not: Kayıt olsanız bile şu anki backend yapımız her girişi onaylıyor
      const response = await axios.post('http://localhost:8000/api/login', { 
        email,
        password, // Şifre doğrulaması eklenebilir
        ...(!isLogin && formData) // Eğer kayıt oluyorsa isim ve yaş bilgilerini de gönder
      });

      if (response.data.status === "success") {
        // 1. Kullanıcı bilgilerini yerel depolamaya (localStorage) kaydediyoruz
        localStorage.setItem('user_id', response.data.user_id);
        localStorage.setItem('user_role', response.data.role);
        
        // 2. İsim bilgisini kaydediyoruz (Profil sayfasında görünmesi için)
        // Eğer kayıt modundaysa formdaki ismi, giriş modundaysa varsayılan "Kullanıcı" ismini al
        const displayName = !isLogin ? formData.firstName : (localStorage.getItem('user_name') || 'Kullanıcı');
        localStorage.setItem('user_name', displayName);
        
        // 3. Başarı mesajı ve yönlendirme
        alert(isLogin ? "Tekrar hoş geldin!" : "Aramıza hoş geldin! Hakkın 7'ye çıkarıldı.");
        navigate('/'); // Ana sayfaya uçurur
        window.location.reload(); // Navbar'daki butonların güncellenmesi için sayfayı tazeler
      }
    } catch (error) {
      console.error("Auth Error:", error);
      alert("Sunucuya bağlanılamadı! Lütfen terminalde Python sunucusunun çalıştığından emin olun.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] p-6">
      <div className="w-full max-w-md bg-white rounded-[3rem] shadow-2xl p-10 border border-gray-100">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-gray-900 mb-2 font-manrope">
            {isLogin ? 'Tekrar Hoş Geldin' : 'Aramıza Katıl'}
          </h2>
          <p className="text-gray-500 font-medium">
            {isLogin ? 'Analizlerine devam et.' : 'Üye ol, ücretsiz analiz hakkını 7\'ye çıkar!'}
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleAuth}>
          {/* Kayıt Modunda Açılan Ekstra Alanlar: İsim, Soyisim ve Yaş */}
          {!isLogin && (
            <>
              <div className="grid grid-cols-2 gap-4 animate-in fade-in duration-500">
                <div className="relative">
                  <UserIcon className="absolute left-4 top-4 text-gray-400" size={18} />
                  <input 
                    type="text" placeholder="Ad" required
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="w-full h-14 pl-11 pr-4 rounded-2xl bg-gray-50 outline-none border-2 border-transparent focus:border-[#10B981]/30 transition-all text-sm font-medium" 
                  />
                </div>
                <input 
                  type="text" placeholder="Soyad" required
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  className="w-full h-14 px-6 rounded-2xl bg-gray-50 outline-none border-2 border-transparent focus:border-[#10B981]/30 transition-all text-sm font-medium" 
                />
              </div>
              <div className="relative animate-in fade-in duration-700">
                <Calendar className="absolute left-4 top-4 text-gray-400" size={18} />
                <input 
                  type="number" placeholder="Yaşınız" required
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                  className="w-full h-14 pl-11 pr-4 rounded-2xl bg-gray-50 outline-none border-2 border-transparent focus:border-[#10B981]/30 transition-all text-sm font-medium" 
                />
              </div>
            </>
          )}

          {/* E-posta ve Şifre (Her iki modda da ortak) */}
          <div className="relative">
            <Mail className="absolute left-4 top-4 text-gray-400" size={20} />
            <input 
              type="email" required placeholder="E-posta Adresi"
              value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full h-14 pl-12 pr-6 rounded-2xl bg-gray-50 outline-none border-2 border-transparent focus:border-[#10B981]/30 transition-all font-medium" 
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-4 text-gray-400" size={20} />
            <input 
              type="password" required placeholder="Şifre"
              value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full h-14 pl-12 pr-6 rounded-2xl bg-gray-50 outline-none border-2 border-transparent focus:border-[#10B981]/30 transition-all font-medium" 
            />
          </div>
          
          <button type="submit" className="w-full h-14 bg-black text-white rounded-2xl font-black flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all mt-6 shadow-xl shadow-black/10 tracking-wide">
            {isLogin ? <LogIn size={20} /> : <UserPlus size={20} />}
            {isLogin ? 'GİRİŞ YAP' : 'KAYIT OL'}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-gray-100 pt-6">
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            className="text-sm font-bold text-gray-400 hover:text-[#10B981] transition-all"
          >
            {isLogin ? 'Henüz hesabın yok mu? Kayıt Ol' : 'Zaten üye misin? Giriş Yap'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;