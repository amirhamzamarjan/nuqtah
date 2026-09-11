import React, { useState, useEffect } from 'react';
import { store } from '../../lib/store';
import { InstituteAyah } from '../../types';
import { AyahViewer } from '../../components/arabic/AyahViewer';

export const AyatPage: React.FC = () => {
  const [ayat, setAyat] = useState<InstituteAyah[]>([]);

  useEffect(() => {
    const update = () => {
      setAyat(store.getInstituteAyat());
    };
    update();
    return store.subscribe(update);
  }, []);

  return (
    <div className="min-h-screen bg-[#EFE9DF] text-[#1F1B17] py-16 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-[#91713B] font-mono font-semibold">
            Quranic Verses
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif text-[#1F1B17]">
            Ayat & Reflections
          </h1>
          <p className="text-xs sm:text-sm text-[#544C41] font-light leading-relaxed">
            Sacred verses rendered with traditional Arabic typography alongside English translations and thoughtful commentary.
          </p>
        </div>

        <div className="space-y-12">
          {ayat.map((ayah) => (
            <AyahViewer key={ayah.id} ayah={ayah} showReflection={true} />
          ))}
        </div>
      </div>
    </div>
  );
};
