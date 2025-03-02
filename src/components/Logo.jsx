import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center justify-center"> {/* Center the logo horizontally */}
      <div className="max-w-[80vw] max-h-[20vh] sm:max-w-[70vw] sm:max-h-[25vh] md:max-w-[60vw] md:max-h-[30vh] lg:max-w-[50vw] lg:max-h-[35vh] xl:max-w-[40vw] xl:max-h-[40vh]"> 
        {/* Use max-width and max-height with viewport units for responsiveness */}
        <img 
          src="/images/image(1).jpg" 
          alt="Golden Guardians Logo" 
          className="w-full h-auto object-contain" // Use h-auto to maintain aspect ratio
        />
      </div>
    </div>
  );
};

export default Logo;