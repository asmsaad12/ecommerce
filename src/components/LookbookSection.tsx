import React from 'react';
import { LOOKBOOK_ITEMS } from '../data/products';
import { Category } from '../types';
import { ArrowRight, Sparkles } from 'lucide-react';

interface LookbookSectionProps {
  onSelectCategory: (category: Category) => void;
}

export const LookbookSection: React.FC<LookbookSectionProps> = ({ onSelectCategory }) => {
  return (
    <section className="py-16 bg-stone-900 text-stone-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-rose-300 text-xs font-semibold uppercase tracking-widest mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Editorial Lookbook 2026</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white">
              Behind The Atelier Runway
            </h2>
          </div>
          <p className="text-xs text-stone-400 max-w-sm mt-3 md:mt-0 font-light leading-relaxed">
            Explore seasonal style inspirations captured on location from Paris to the French Riviera.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LOOKBOOK_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectCategory(item.categoryLink)}
              className="group relative h-96 rounded-3xl overflow-hidden cursor-pointer border border-stone-800 shadow-xl"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent" />

              <div className="absolute top-4 left-4">
                <span className="bg-rose-950/80 border border-rose-800/40 text-rose-200 text-[10px] uppercase font-bold px-3 py-1 rounded-full backdrop-blur-md">
                  {item.tag}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white space-y-2">
                <h3 className="font-serif text-xl font-semibold group-hover:text-rose-200 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-300 font-light line-clamp-2">
                  {item.subtitle}
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-rose-300 uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                  <span>Shop Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
