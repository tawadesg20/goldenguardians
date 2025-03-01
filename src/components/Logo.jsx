import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center space-x-3">
      <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40">
        <img 
          src="/images/image(1).jpg" 
          alt="Golden Guardians Logo" 
          className="w-full h-full object-contain"
         
        />
    
      </div>
    </div>
  );
};

export default Logo;
