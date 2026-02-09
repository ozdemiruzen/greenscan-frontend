import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar'; // Yeni Navbar bileşenimiz
import AnalysisPage from './pages/AnalysisPage';
import HistoryPage from './pages/HistoryPage';
import ProfilePage from './pages/ProfilePage';
import AuthPage from './pages/AuthPage';
import PricingPage from './pages/PricingPage';
import './index.css';

function App() {
  // Sidebar'ın genişliğini ve durumunu yöneten state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <AuthProvider>
      <Router>
        <div className="flex bg-[#F9FAFB] min-h-screen transition-all duration-300">
          
          {/* Sol Menü: Her zaman en üstte (z-index ile) ve sabit */}
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
          
          {/* Sağ Üst Navbar: Giriş ve Paketler butonlarını barındırıyor */}
          <Navbar />

          {/* Ana İçerik Alanı */}
          <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-[280px]' : 'ml-20'}`}>
            {/* pt-20 ekledik çünkü Navbar "fixed" (sabit) olduğu için 
              içeriğin Navbar'ın altında kalmasını engelliyoruz.
            */}
            <div className="pt-20"> 
              <Routes>
                {/* Ana Analiz Sayfası */}
                <Route path="/" element={<AnalysisPage />} />
                
                {/* Analiz Geçmişi Sayfası */}
                <Route path="/history" element={<HistoryPage />} />
                
                {/* Kullanıcı Profili ve İstatistikler */}
                <Route path="/profile" element={<ProfilePage />} />

                {/* Giriş Yap ve Kayıt Ol Sayfası */}
                <Route path="/auth" element={<AuthPage />} />

                {/* Paketler ve Üyelik Planları Sayfası */}
                <Route path="/pricing" element={<PricingPage />} />
              </Routes>
            </div>
          </main>
          
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;