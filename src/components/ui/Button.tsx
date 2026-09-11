import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'rose' | 'amber' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-200 tracking-wider uppercase disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 rounded-sm',
    md: 'text-xs px-5 py-2.5 rounded-sm',
    lg: 'text-sm px-7 py-3.5 rounded-sm',
  };

  const variantStyles = {
    primary:
      'bg-[#24201C] text-[#FAF8F3] hover:bg-[#3A342E] shadow-sm hover:shadow-md font-semibold',
    secondary:
      'bg-[#FAF6EF] text-[#24201C] hover:bg-[#F4EFE6] border border-[#B58B47]/30 font-semibold',
    outline:
      'bg-transparent text-[#24201C] border border-[#24201C]/25 hover:border-[#24201C] hover:bg-[#24201C]/[0.03]',
    ghost:
      'bg-transparent text-[#5D554C] hover:text-[#24201C] hover:bg-[#24201C]/[0.04]',
    gold:
      'bg-[#B58B47] text-white hover:bg-[#C9A96A] shadow-luxury-gold font-semibold',
    rose:
      'bg-[#B27468] text-white hover:bg-[#CA9489] shadow-luxury-rose font-semibold',
    amber:
      'bg-[#B1905E] text-white hover:bg-[#C9AE80] font-semibold',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
