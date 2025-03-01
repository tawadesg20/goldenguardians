import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center space-x-3">
      <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-48 xl:h-48">
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
