import React from 'react';
import { ProductBadge } from '../../types';

interface BadgeProps {
  label: ProductBadge | string;
  variant?: 'gold' | 'rose' | 'amber' | 'neutral' | 'sale';
}

export const Badge: React.FC<BadgeProps> = ({ label, variant }) => {
  let style = 'bg-[#24201C]/[0.05] text-[#24201C] border-[#24201C]/15';

  if (variant === 'sale' || label === 'Sale') {
    style = 'bg-[#B58B47]/15 text-[#B58B47] border-[#B58B47]/30 font-semibold';
  } else if (variant === 'rose' || label === 'Featured') {
    style = 'bg-[#B27468]/15 text-[#B27468] border-[#B27468]/30 font-semibold';
  } else if (label === 'New') {
    style = 'bg-[#24201C] text-white border-[#24201C]';
  } else if (label === 'Low Stock') {
    style = 'bg-[#B25E50]/15 text-[#B25E50] border-[#B25E50]/30 font-semibold';
  } else if (label === 'Best Seller') {
    style = 'bg-[#B58B47] text-white border-[#B58B47] font-semibold';
  }

  return (
    <span
      className={`inline-block text-[10px] tracking-widest uppercase font-mono px-2 py-0.5 rounded-sm border ${style}`}
    >
      {label}
    </span>
  );
};
