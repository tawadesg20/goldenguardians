import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="max-w-[50vw] max-h-[15vh] sm:max-w-[40vw] sm:max-h-[20vh] md:max-w-[30vw] md:max-h-[25vh] lg:max-w-[20vw] lg:max-h-[30vh] xl:max-w-[15vw] xl:max-h-[35vh]"> 
        {/* Adjusted max-w and max-h for smaller desktop logo */}
        <img 
          src="/images/image(1).jpg" 
          alt="Golden Guardians Logo" 
          className="w-full h-auto object-contain" 
        />
      </div>
    </div>
  );
};

export default Logo;