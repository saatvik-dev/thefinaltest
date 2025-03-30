import React from 'react';
import logoImage from '../assets/logo.png';

const KledeLogo: React.FC = () => {
  return (
    <div className="flex justify-center">
      <img 
        src={logoImage} 
        alt="Logo" 
        className="h-40 w-auto object-contain"
      />
    </div>
  );
};

export default KledeLogo;
