import React from 'react';

// interface AccessibleInputProps {
//   label: string;
//   type?: string;
//   value: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   required?: boolean;
//   error?: string;
// }

const AccessibleInput = ({
  label,
  type = 'text',
  value,
  onChange,
  required = false,
  error
}) => {
  return (
    <div className="mb-4">
      <label className="block text-xl font-medium text-[#8B4513] mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full text-lg px-4 py-3 rounded-lg border-2 border-[#DEB887] focus:border-[#8B4513] focus:ring-2 focus:ring-[#8B4513]"
        style={{ minHeight: '44px' }}
      />
      {error && (
        <p className="mt-1 text-red-500 text-lg">{error}</p>
      )}
    </div>
  );
};

export default AccessibleInput;