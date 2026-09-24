import React from 'react';
import { Category } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface CategorySpotlightProps {
  onSelectCategory: (category: Category) => void;
}

const SPOTLIGHT_CATEGORIES: { name: Category; image: string; count: number }[] = [
  {
    name: 'Evening Wear',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=80',
    count: 24
  },
  {
    name: 'Cocktail & Party',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80',
    count: 18
  },
  {
    name: 'Summer & Floral',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=600&q=80',
    count: 32
  },
  {
    name: 'Casual & Linen',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=600&q=80',
    count: 15
  },
  {
    name: 'Bridal & Formal',
    image: 'https://images.unsplash.com/photo-1549062572-544a64fb0c56?auto=format&fit=crop&w=600&q=80',
    count: 12
  }
];

export const CategorySpotlight: React.FC<CategorySpotlightProps> = ({ onSelectCategory }) => {
  return (
    <section className="py-12 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-rose-800 font-semibold">
              Curated Silhouettes
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-stone-900 mt-1">
              Shop By Mood & Occasion
            </h2>
          </div>
          <p className="text-xs text-stone-500 max-w-sm mt-2 md:mt-0 font-light">
            Whether preparing for a grand black-tie evening or a relaxed summer weekend getaway, find your ideal dress.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {SPOTLIGHT_CATEGORIES.map((cat) => (
            <div
              key={cat.name}
              onClick={() => onSelectCategory(cat.name)}
              className="group relative h-64 sm:h-80 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all border border-stone-200"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent transition-opacity group-hover:opacity-90" />
              
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-base sm:text-lg font-medium group-hover:text-rose-200 transition-colors">
                    {cat.name}
                  </h3>
                  <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-rose-700 transition-colors">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </div>
                <p className="text-[11px] text-stone-300 font-light mt-0.5">
                  {cat.count} Designs
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
