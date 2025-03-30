import React, { useState } from 'react';
import logoImage from '../assets/logo.png';

const KledeLogo: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className="flex justify-center">
      <img 
        src={logoImage} 
        alt="Logo" 
        className="h-64 w-auto object-contain transition-all duration-500 ease-in-out cursor-pointer"
        style={{ 
          filter: `invert(1) ${isHovered ? 'drop-shadow(0 0 12px rgba(255, 255, 255, 0.9))' : ''}`,
          transform: isHovered ? 'scale(1.08)' : 'scale(1)',
          transition: 'transform 0.5s ease-in-out, filter 0.5s ease-in-out'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => {
          // Add a brief animation when clicked
          setIsHovered(false);
          setTimeout(() => setIsHovered(true), 100);
          setTimeout(() => setIsHovered(false), 300);
        }}
      />
    </div>
  );
};

export default KledeLogo;
