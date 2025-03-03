import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center"> {/* Remove justify-center */}
      <div className="max-w-[100px] max-h-[40px] sm:max-w-[120px] sm:max-h-[48px] md:max-w-[140px] md:max-h-[56px] lg:max-w-[160px] lg:max-h-[64px] xl:max-w-[180px] xl:max-h-[72px]">
        {/* Adjusted max-w and max-h to fixed pixel values for better control */}
        <img
          src="/images/logo.jpg"
          alt="Golden Guardians Logo"
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default Logo;