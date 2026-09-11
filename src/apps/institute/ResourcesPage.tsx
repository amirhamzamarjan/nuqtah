import React, { useState, useEffect } from 'react';
import { Download, FileText } from 'lucide-react';
import { store } from '../../lib/store';
import { InstituteResource } from '../../types';

export const ResourcesPage: React.FC = () => {
  const [resources, setResources] = useState<InstituteResource[]>([]);

  useEffect(() => {
    const update = () => {
      setResources(store.getInstituteResources());
    };
    update();
    return store.subscribe(update);
  }, []);

  return (
    <div className="min-h-screen bg-[#EFE9DF] text-[#1F1B17] py-16 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-[#91713B] font-mono font-semibold">
            Study Guides & Printables
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif text-[#1F1B17]">
            Institute Resources
          </h1>
          <p className="text-xs sm:text-sm text-[#544C41] font-light leading-relaxed">
            High-fidelity typography printables, daily remembrance guides, and structured study charts.
          </p>
        </div>

        <div className="space-y-4">
          {resources.map((res) => (
            <div
              key={res.id}
              className="surface-card bg-[#FDFBF8] rounded-sm p-6 border border-[#322C26]/10 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-sm bg-[#EAE1D3] border border-[#322C26]/10 flex items-center justify-center text-[#91713B] flex-shrink-0 mt-1 sm:mt-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#91713B] font-semibold">
                    {res.fileType} {res.fileSize && `• ${res.fileSize}`}
                  </span>
                  <h3 className="text-lg font-serif font-semibold text-[#1F1B17]">{res.title}</h3>
                  <p className="text-xs text-[#544C41] font-light leading-relaxed max-w-xl">
                    {res.description}
                  </p>
                </div>
              </div>

              <a
                href={res.fileUrl}
                download
                className="px-6 py-2.5 bg-[#EAE1D3] hover:bg-[#FAF5EC] text-[#1F1B17] border border-[#322C26]/15 rounded-sm text-xs font-mono uppercase tracking-widest flex items-center justify-center space-x-2 transition-colors whitespace-nowrap font-bold shadow-sm"
              >
                <Download className="w-4 h-4 text-[#91713B]" />
                <span>Download PDF</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
