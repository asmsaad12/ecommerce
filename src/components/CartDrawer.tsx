import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Truck, Check } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [promoError, setPromoError] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 150;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const discountAmount = subtotal * appliedDiscount;
  const estimatedShipping = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 15;
  const total = subtotal - discountAmount + estimatedShipping;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = promoCode.trim().toUpperCase();
    if (code === 'AURA15') {
      setAppliedDiscount(0.15);
    } else if (code === 'LUXE20') {
      setAppliedDiscount(0.20);
    } else {
      setPromoError('Invalid promo code. Try AURA15 or LUXE20');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity animate-fadeIn"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-stone-200">
          
          {/* Cart Header */}
          <div className="p-6 border-b border-stone-200 bg-stone-50/60">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-serif text-xl font-semibold text-stone-900">
                <ShoppingBag className="w-5 h-5 text-rose-800" />
                <span>Your Shopping Bag</span>
                <span className="text-xs bg-rose-100 text-rose-900 px-2.5 py-0.5 rounded-full font-sans font-bold">
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-stone-500 hover:text-stone-900 transition-colors rounded-full hover:bg-stone-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Indicator */}
            <div className="mt-4 bg-white p-3 rounded-xl border border-stone-200 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-stone-700 flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-rose-800" />
                  {remainingForFreeShipping === 0 ? (
                    <span className="text-emerald-700 font-semibold">✨ You unlocked Free Express Shipping!</span>
                  ) : (
                    <span>Add <strong>${remainingForFreeShipping.toFixed(2)}</strong> for Free Shipping</span>
                  )}
                </span>
                <span className="text-[10px] text-stone-400">{Math.round(progressPercent)}%</span>
              </div>
              <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-rose-800 h-full transition-all duration-500 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Cart Items Scroll Container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 bg-rose-50 text-rose-800 rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-stone-900">Your bag is empty</h3>
                <p className="text-xs text-stone-500 font-light max-w-xs">
                  Discover our new arrivals and find your perfect dress silhouette.
                </p>
                <button
                  onClick={onClose}
                  className="bg-stone-900 text-white px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item, index) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}`}
                  className="flex gap-4 p-3 bg-stone-50/50 rounded-2xl border border-stone-200/80 hover:border-stone-300 transition-all"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover rounded-xl border border-stone-200"
                  />

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif text-sm font-semibold text-stone-900 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(index)}
                          className="text-stone-400 hover:text-rose-700 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mt-1 text-[11px] text-stone-500">
                        <span className="bg-white px-2 py-0.5 rounded border border-stone-200 font-bold text-stone-800">
                          {item.selectedSize}
                        </span>
                        <div className="flex items-center gap-1">
                          <span className="w-2.5 h-2.5 rounded-full border border-stone-300" style={{ backgroundColor: item.selectedColor.hex }} />
                          <span>{item.selectedColor.name}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      {/* Quantity Buttons */}
                      <div className="flex items-center border border-stone-300 rounded-lg bg-white overflow-hidden">
                        <button
                          onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                          className="px-2 py-0.5 text-stone-600 hover:bg-stone-100 font-bold text-xs"
                        >
                          -
                        </button>
                        <span className="px-3 py-0.5 text-xs font-bold text-stone-900">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                          className="px-2 py-0.5 text-stone-600 hover:bg-stone-100 font-bold text-xs"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-semibold text-sm text-stone-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer Summary & Checkout Button */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-stone-200 bg-stone-50/80 space-y-4">
              
              {/* Promo Form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo Code (AURA15)"
                    className="w-full bg-white border border-stone-300 rounded-xl pl-9 pr-3 py-2 text-xs uppercase font-medium placeholder:capitalize outline-none focus:border-rose-800"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-stone-900 hover:bg-stone-800 text-white px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  Apply
                </button>
              </form>

              {appliedDiscount > 0 && (
                <div className="flex items-center justify-between text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                  <span className="flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>Promo code applied ({appliedDiscount * 100}% off)</span>
                  </span>
                  <button onClick={() => setAppliedDiscount(0)} className="text-stone-400 hover:text-stone-700">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
              {promoError && <p className="text-[11px] text-rose-700 font-medium">{promoError}</p>}

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs text-stone-600 font-light pt-2 border-t border-stone-200">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-stone-900 font-medium">${subtotal.toFixed(2)}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="text-stone-900 font-medium">
                    {estimatedShipping === 0 ? <strong className="text-emerald-700 uppercase font-bold text-[10px]">Free</strong> : `$${estimatedShipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
                  <span>Total Due</span>
                  <span className="text-base text-rose-900">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Trigger Button */}
              <button
                onClick={onProceedToCheckout}
                className="w-full bg-rose-900 hover:bg-rose-800 text-white py-3.5 rounded-2xl text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-rose-900/20 transition-all"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
