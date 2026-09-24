import React, { useState } from 'react';
import { Product, Size } from '../types';
import { Heart, Eye, ShoppingBag, Star, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: Size, color: { name: string; hex: string }) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
}) => {
  const [currentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize] = useState<Size>(product.sizes[0]);
  const [isAdding, setIsAdding] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    onAddToCart(product, selectedSize, selectedColor);
    setTimeout(() => setIsAdding(false), 1200);
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-stone-200/70 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      {/* Top Image Container */}
      <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden cursor-pointer" onClick={() => onQuickView(product)}>
        <img
          src={product.images[currentImageIndex] || product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.isNew && (
            <span className="bg-stone-900 text-amber-50 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
              New Arrival
            </span>
          )}
          {product.isSale && product.originalPrice && (
            <span className="bg-rose-700 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% Off
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all z-10 ${
            isWishlisted
              ? 'bg-rose-700 text-white shadow-md'
              : 'bg-white/80 text-stone-700 hover:bg-white hover:text-rose-700'
          }`}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Hover Quick View overlay trigger */}
        <div className="absolute inset-x-0 bottom-3 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 hidden sm:block">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-full bg-white/95 hover:bg-white text-stone-900 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg backdrop-blur-sm transition-all"
          >
            <Eye className="w-4 h-4 text-rose-800" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Card Content & Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
            <span className="uppercase tracking-widest text-[10px] font-medium text-rose-900">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="text-stone-700 font-semibold text-xs">{product.rating}</span>
              <span className="text-stone-400 text-[10px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3
            onClick={() => onQuickView(product)}
            className="font-serif text-base font-semibold text-stone-900 hover:text-rose-900 transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          {/* Color Swatches */}
          <div className="flex items-center gap-1.5 mt-2">
            {product.colors.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color)}
                className={`w-4 h-4 rounded-full border transition-all ${
                  selectedColor.name === color.name
                    ? 'ring-2 ring-rose-800 ring-offset-1 scale-110'
                    : 'border-stone-300 hover:scale-105'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            <span className="text-[10px] text-stone-400 ml-1 font-light">{selectedColor.name}</span>
          </div>
        </div>

        {/* Bottom Price & Quick Add */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-semibold text-base text-stone-900">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xs text-stone-400 line-through">${product.originalPrice}</span>
              )}
            </div>
          </div>

          <button
            onClick={handleQuickAdd}
            disabled={isAdding}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm ${
              isAdding
                ? 'bg-emerald-700 text-white'
                : 'bg-stone-900 hover:bg-stone-800 text-white'
            }`}
          >
            {isAdding ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-200" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-rose-200" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
