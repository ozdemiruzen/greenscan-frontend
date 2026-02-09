import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Yolları temizledik çünkü App.js zaten src içinde
import { AuthProvider } from './contexts/AuthContext';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar'; 
import AnalysisPage from './pages/AnalysisPage';
import HistoryPage from './pages/HistoryPage';
import ProfilePage from './pages/ProfilePage';
import AuthPage from './pages/AuthPage';
import PricingPage from './pages/PricingPage';
import './index.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <AuthProvider>
      <Router>
        <div className="flex bg-[#F9FAFB] min-h-screen transition-all duration-300">
          
          {/* Sidebar ve Navbar bileşenlerinin hatasız olduğundan emin olmalısın */}
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
          <Navbar />

          <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-[280px]' : 'ml-20'}`}>
            <div className="pt-20"> 
              <Routes>
                {/* Ana yolun AnalysisPage'e çıktığından emin oluyoruz */}
                <Route path="/" element={<AnalysisPage />} />
                <Route path="/history" element={<HistoryPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/auth" element={<AuthPage />} />
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