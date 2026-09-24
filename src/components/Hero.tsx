import React from 'react';
import { ArrowRight, ShieldCheck, Truck, RotateCcw, Sparkles } from 'lucide-react';
import { Category, InfoModalType } from '../types';

interface HeroProps {
  onExploreClick: (category: Category) => void;
  onOpenInfoModal: (type: InfoModalType) => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onOpenInfoModal }) => {
  return (
    <section className="relative overflow-hidden bg-stone-900 text-stone-100">
      {/* Background Image Banner */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=80"
          alt="High Fashion Dress Collection Banner"
          className="w-full h-full object-cover object-center opacity-40 scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-950/65 to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-rose-950/80 border border-rose-800/40 text-rose-200 px-3 py-1 rounded-full text-xs uppercase tracking-widest font-medium mb-6 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-rose-300" />
            <span>Autumn Haute Couture Edit 2026</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight">
            Elegance Reimagined <br />
            <span className="italic font-light text-rose-200">For Every Milestone</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-stone-300 font-light leading-relaxed">
            Immerse yourself in our curated selection of mulberry silk gowns, tailored cocktail silhouettes, and ethereal floral maxis designed for life's most memorable moments.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => onExploreClick('Evening Wear')}
              className="inline-flex items-center justify-center gap-2 bg-rose-800 hover:bg-rose-700 text-white px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all shadow-lg hover:shadow-rose-900/30"
            >
              <span>Explore Gowns & Evening Wear</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onExploreClick('Summer & Floral')}
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest backdrop-blur-sm transition-all"
            >
              <span>Shop Summer Linens</span>
            </button>
          </div>
        </div>

        {/* Feature Badges Bar */}
        <div className="mt-16 sm:mt-24 pt-8 border-t border-stone-800/80 grid grid-cols-1 sm:grid-cols-3 gap-6 text-stone-300">
          <div
            onClick={() => onOpenInfoModal('shipping')}
            className="flex items-center gap-3 cursor-pointer group hover:opacity-90 transition-opacity"
          >
            <div className="p-2.5 bg-rose-950/60 rounded-full text-rose-300 border border-rose-800/30 group-hover:bg-rose-900 transition-colors">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Express Worldwide Delivery</h4>
              <p className="text-[11px] text-stone-400">Insured 2-day shipping available</p>
            </div>
          </div>
          
          <div
            onClick={() => onOpenInfoModal('sustainability')}
            className="flex items-center gap-3 cursor-pointer group hover:opacity-90 transition-opacity"
          >
            <div className="p-2.5 bg-rose-950/60 rounded-full text-rose-300 border border-rose-800/30 group-hover:bg-rose-900 transition-colors">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Artisanal Craftsmanship</h4>
              <p className="text-[11px] text-stone-400">100% sustainably sourced silk & linen</p>
            </div>
          </div>

          <div
            onClick={() => onOpenInfoModal('returns')}
            className="flex items-center gap-3 cursor-pointer group hover:opacity-90 transition-opacity"
          >
            <div className="p-2.5 bg-rose-950/60 rounded-full text-rose-300 border border-rose-800/30 group-hover:bg-rose-900 transition-colors">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Seamless 30-Day Returns</h4>
              <p className="text-[11px] text-stone-400">Hassle-free size exchange guarantee</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
