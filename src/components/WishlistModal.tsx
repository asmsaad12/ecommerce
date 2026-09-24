import React from 'react';
import { Product, Size } from '../types';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product, size: Size, color: { name: string; hex: string }) => void;
  onQuickView: (product: Product) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onAddToCart,
  onQuickView,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative border border-stone-200">
        
        {/* Header */}
        <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50/60 rounded-t-3xl">
          <div className="flex items-center gap-2 font-serif text-xl font-semibold text-stone-900">
            <Heart className="w-5 h-5 text-rose-700 fill-current" />
            <span>Saved Wishlist ({wishlist.length})</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-500 hover:text-stone-900 rounded-full hover:bg-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {wishlist.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-rose-50 text-rose-700 rounded-full flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-stone-900">Your wishlist is currently empty</h3>
              <p className="text-xs text-stone-500 font-light max-w-xs mx-auto">
                Save your favorite evening gowns, cocktail minis, and linen dresses to keep track of them.
              </p>
              <button
                onClick={onClose}
                className="bg-stone-900 text-white px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition-colors"
              >
                Browse Dress Collection
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {wishlist.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-3 bg-stone-50 rounded-2xl border border-stone-200 hover:shadow-md transition-all"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-20 h-24 object-cover rounded-xl border border-stone-200 cursor-pointer"
                    onClick={() => {
                      onQuickView(product);
                      onClose();
                    }}
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4
                          onClick={() => {
                            onQuickView(product);
                            onClose();
                          }}
                          className="font-serif text-sm font-semibold text-stone-900 hover:text-rose-900 line-clamp-1 cursor-pointer"
                        >
                          {product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveFromWishlist(product)}
                          className="text-stone-400 hover:text-rose-700 p-1 transition-colors"
                          title="Remove"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-xs font-bold text-stone-900 mt-1">${product.price}</p>
                      <p className="text-[10px] text-rose-800 uppercase tracking-widest mt-0.5">{product.category}</p>
                    </div>

                    <button
                      onClick={() => {
                        onAddToCart(product, product.sizes[0], product.colors[0]);
                        onRemoveFromWishlist(product);
                      }}
                      className="w-full mt-2 bg-stone-900 hover:bg-stone-800 text-white py-1.5 rounded-xl text-[11px] font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-rose-200" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
