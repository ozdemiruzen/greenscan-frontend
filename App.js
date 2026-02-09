import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Yolları "frontend/src" ekleyerek güncelledik çünkü App.js artık bir üst klasörde
import { AuthProvider } from './frontend/src/contexts/AuthContext';
import Sidebar from './frontend/src/components/Sidebar';
import Navbar from './frontend/src/components/Navbar'; 
import AnalysisPage from './frontend/src/pages/AnalysisPage';
import HistoryPage from './frontend/src/pages/HistoryPage';
import ProfilePage from './frontend/src/pages/ProfilePage';
import AuthPage from './frontend/src/pages/AuthPage';
import PricingPage from './frontend/src/pages/PricingPage';
import './index.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <AuthProvider>
      <Router>
        <div className="flex bg-[#F9FAFB] min-h-screen transition-all duration-300">
          
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
          <Navbar />

          <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-[280px]' : 'ml-20'}`}>
            <div className="pt-20"> 
              <Routes>
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