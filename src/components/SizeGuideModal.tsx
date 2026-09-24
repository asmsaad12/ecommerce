import React, { useState } from 'react';
import { X, Ruler, Sparkles } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative border border-stone-200">
        
        {/* Header */}
        <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50/80 rounded-t-3xl">
          <div className="flex items-center gap-2 font-serif text-xl font-semibold text-stone-900">
            <Ruler className="w-5 h-5 text-rose-800" />
            <span>Atelier Dress Size & Fit Guide</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-500 hover:text-stone-900 rounded-full hover:bg-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          <div className="flex justify-between items-center">
            <p className="text-xs text-stone-500 font-light">
              All Aura Atelier dresses are designed according to standard haute couture sizing.
            </p>

            {/* Inches / cm Toggle */}
            <div className="flex bg-stone-100 p-1 rounded-full border border-stone-200 text-xs font-semibold">
              <button
                onClick={() => setUnit('inches')}
                className={`px-3 py-1 rounded-full transition-all ${
                  unit === 'inches' ? 'bg-rose-900 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Inches
              </button>
              <button
                onClick={() => setUnit('cm')}
                className={`px-3 py-1 rounded-full transition-all ${
                  unit === 'cm' ? 'bg-rose-900 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Centimeters
              </button>
            </div>
          </div>

          {/* Size Chart Table */}
          <div className="overflow-x-auto border border-stone-200 rounded-2xl">
            <table className="w-full text-xs text-left">
              <thead className="bg-stone-100 text-stone-900 font-serif uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="p-3">Size</th>
                  <th className="p-3">US / UK</th>
                  <th className="p-3">Bust</th>
                  <th className="p-3">Waist</th>
                  <th className="p-3">Hips</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 text-stone-700">
                <tr className="hover:bg-rose-50/40">
                  <td className="p-3 font-bold text-rose-900">XS</td>
                  <td className="p-3">0 - 2 / 4 - 6</td>
                  <td className="p-3">{unit === 'inches' ? '31.5 - 32.5"' : '80 - 83 cm'}</td>
                  <td className="p-3">{unit === 'inches' ? '24 - 25"' : '61 - 64 cm'}</td>
                  <td className="p-3">{unit === 'inches' ? '34.5 - 35.5"' : '87 - 90 cm'}</td>
                </tr>
                <tr className="hover:bg-rose-50/40">
                  <td className="p-3 font-bold text-rose-900">S</td>
                  <td className="p-3">4 - 6 / 8 - 10</td>
                  <td className="p-3">{unit === 'inches' ? '33.5 - 34.5"' : '85 - 88 cm'}</td>
                  <td className="p-3">{unit === 'inches' ? '26 - 27"' : '66 - 69 cm'}</td>
                  <td className="p-3">{unit === 'inches' ? '36.5 - 37.5"' : '92 - 95 cm'}</td>
                </tr>
                <tr className="hover:bg-rose-50/40">
                  <td className="p-3 font-bold text-rose-900">M</td>
                  <td className="p-3">8 - 10 / 12 - 14</td>
                  <td className="p-3">{unit === 'inches' ? '35.5 - 36.5"' : '90 - 93 cm'}</td>
                  <td className="p-3">{unit === 'inches' ? '28 - 29"' : '71 - 74 cm'}</td>
                  <td className="p-3">{unit === 'inches' ? '38.5 - 39.5"' : '97 - 100 cm'}</td>
                </tr>
                <tr className="hover:bg-rose-50/40">
                  <td className="p-3 font-bold text-rose-900">L</td>
                  <td className="p-3">12 - 14 / 16 - 18</td>
                  <td className="p-3">{unit === 'inches' ? '38.0 - 39.5"' : '96 - 100 cm'}</td>
                  <td className="p-3">{unit === 'inches' ? '30.5 - 32.0"' : '77 - 81 cm'}</td>
                  <td className="p-3">{unit === 'inches' ? '41.0 - 42.5"' : '104 - 108 cm'}</td>
                </tr>
                <tr className="hover:bg-rose-50/40">
                  <td className="p-3 font-bold text-rose-900">XL</td>
                  <td className="p-3">16 / 20</td>
                  <td className="p-3">{unit === 'inches' ? '41.0 - 42.5"' : '104 - 108 cm'}</td>
                  <td className="p-3">{unit === 'inches' ? '33.5 - 35.0"' : '85 - 89 cm'}</td>
                  <td className="p-3">{unit === 'inches' ? '44.0 - 45.5"' : '111 - 115 cm'}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-rose-50 p-4 rounded-2xl border border-rose-200 text-xs text-rose-950 space-y-1">
            <div className="flex items-center gap-1.5 font-bold">
              <Sparkles className="w-4 h-4 text-rose-800" />
              <span>Need Personal Fitting Assistance?</span>
            </div>
            <p className="font-light">
              If you fall between sizes or require custom hem alterations for evening gowns, contact our Virtual Stylist team via client support.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
