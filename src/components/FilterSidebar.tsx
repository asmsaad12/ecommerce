import React from 'react';
import { FilterState, Category, Size } from '../types';
import { SlidersHorizontal, RotateCcw, Check } from 'lucide-react';

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  totalResultsCount: number;
}

const CATEGORIES: Category[] = [
  'All',
  'Evening Wear',
  'Cocktail & Party',
  'Summer & Floral',
  'Casual & Linen',
  'Bridal & Formal',
  'Velvet & Winter Edit'
];

const SIZES: Size[] = ['XS', 'S', 'M', 'L', 'XL'];

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalResultsCount,
}) => {
  const toggleSize = (size: Size) => {
    const updated = filters.selectedSizes.includes(size)
      ? filters.selectedSizes.filter((s) => s !== size)
      : [...filters.selectedSizes, size];
    onFilterChange({ selectedSizes: updated });
  };

  return (
    <aside className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-6 sticky top-24">
      
      {/* Filter Header & Reset */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-100">
        <div className="flex items-center gap-2 font-serif text-lg font-semibold text-stone-900">
          <SlidersHorizontal className="w-4 h-4 text-rose-800" />
          <span>Refine Selection</span>
        </div>
        <button
          onClick={onResetFilters}
          className="inline-flex items-center gap-1 text-[11px] text-stone-500 hover:text-rose-900 transition-colors uppercase tracking-wider font-medium"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Result Count Indicator */}
      <p className="text-xs text-stone-500 font-light">
        Showing <strong className="text-stone-900 font-semibold">{totalResultsCount}</strong> dresses
      </p>

      {/* Sort By Option */}
      <div>
        <label className="block text-xs uppercase tracking-wider text-stone-500 font-semibold mb-2">
          Sort By
        </label>
        <select
          value={filters.sortBy}
          onChange={(e) => onFilterChange({ sortBy: e.target.value as FilterState['sortBy'] })}
          className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-800 font-medium focus:outline-none focus:border-rose-800"
        >
          <option value="featured">Featured Collection</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Customer Rated</option>
          <option value="newest">New Arrivals</option>
        </select>
      </div>

      {/* Categories Filter */}
      <div>
        <label className="block text-xs uppercase tracking-wider text-stone-500 font-semibold mb-3">
          Category
        </label>
        <div className="space-y-1.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onFilterChange({ category: cat })}
              className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-all flex items-center justify-between font-medium ${
                filters.category === cat
                  ? 'bg-rose-950 text-white font-semibold'
                  : 'text-stone-600 hover:bg-stone-50'
              }`}
            >
              <span>{cat}</span>
              {filters.category === cat && <Check className="w-3.5 h-3.5 text-rose-300" />}
            </button>
          ))}
        </div>
      </div>

      {/* Size Filter */}
      <div>
        <label className="block text-xs uppercase tracking-wider text-stone-500 font-semibold mb-3">
          Dress Size
        </label>
        <div className="grid grid-cols-5 gap-2">
          {SIZES.map((size) => {
            const isSelected = filters.selectedSizes.includes(size);
            return (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                  isSelected
                    ? 'bg-rose-900 border-rose-900 text-white shadow-sm'
                    : 'bg-white border-stone-200 text-stone-700 hover:border-stone-400'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Slider */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-xs uppercase tracking-wider text-stone-500 font-semibold">
            Max Price
          </label>
          <span className="text-xs font-bold text-stone-900">${filters.priceRange[1]}</span>
        </div>
        <input
          type="range"
          min="100"
          max="700"
          step="10"
          value={filters.priceRange[1]}
          onChange={(e) =>
            onFilterChange({ priceRange: [filters.priceRange[0], Number(e.target.value)] })
          }
          className="w-full accent-rose-800 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-stone-400 mt-1">
          <span>$100</span>
          <span>$700+</span>
        </div>
      </div>

      {/* In Stock Only Checkbox */}
      <div className="pt-2 border-t border-stone-100">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => onFilterChange({ inStockOnly: e.target.checked })}
            className="w-4 h-4 rounded text-rose-800 focus:ring-rose-800 accent-rose-800"
          />
          <span className="text-xs font-medium text-stone-700">In Stock Ready to Ship</span>
        </label>
      </div>

    </aside>
  );
};
