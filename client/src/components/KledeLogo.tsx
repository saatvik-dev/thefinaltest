import React from 'react';
import logoImage from '../assets/logo.png';

const KledeLogo: React.FC = () => {
  return (
    <div className="flex justify-center">
      <img 
        src={logoImage} 
        alt="Logo" 
        className="h-64 w-auto object-contain"
        style={{ filter: 'invert(1)' }} // Invert colors to make black logo visible on white background
      />
    </div>
  );
};

export default KledeLogo;
