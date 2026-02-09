import React from 'react';

const Logo = ({ size = 32 }) => (
  <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
    {/* Logonun Arka Planı (Turkuaz/Yeşil Gradyan) */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#10B981] to-[#3B82F6] rounded-xl shadow-lg rotate-3" />
    
    {/* Yaprak Logosu (SVG olarak çizdik, asla bozulmaz) */}
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

export default Logo;