import React from 'react';


const AccessibleButton = ({ 
  children, 
  onClick, 
  variant = 'primary',
  size = 'large',
  fullWidth = false
}) => {
  const baseStyles = "rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center";
  const sizeStyles = {
    large: "text-xl py-4 px-8",
    medium: "text-lg py-3 px-6"
  };
  const variantStyles = {
    primary: "bg-[#8B4513] text-white hover:bg-[#A0522D] focus:ring-4 focus:ring-[#DEB887]",
    secondary: "bg-[#DEB887] text-[#8B4513] hover:bg-[#E6C9A8] focus:ring-4 focus:ring-[#8B4513]"
  };

  return (
    <button
      onClick={onClick}
      className={`
        ${baseStyles}
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${fullWidth ? 'w-full' : ''}
      `}
      style={{ minHeight: '44px' }}
    >
      {children}
    </button>
  );
};

export default AccessibleButton;