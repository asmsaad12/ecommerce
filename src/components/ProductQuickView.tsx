import React, { useState } from 'react';
import { Product, Size, ProductReview } from '../types';
import { X, Star, Heart, ShoppingBag, ShieldCheck, RefreshCw, Sparkles, Check, MessageSquarePlus } from 'lucide-react';

interface ProductQuickViewProps {
  product: Product | null;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, size: Size, color: { name: string; hex: string }, quantity: number) => void;
  onOpenSizeGuide: () => void;
  onAddReview: (productId: string, review: ProductReview) => void;
}

export const ProductQuickView: React.FC<ProductQuickViewProps> = ({
  product,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onOpenSizeGuide,
  onAddReview,
}) => {
  if (!product) return null;

  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState<Size>(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'fabric' | 'reviews'>('details');
  const [isAdded, setIsAdded] = useState(false);

  // Review Form state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment && newUserName) {
      const newRev: ProductReview = {
        id: 'r-' + Date.now(),
        userName: newUserName,
        rating: newRating,
        date: new Date().toISOString().split('T')[0],
        comment: newComment,
        verifiedPurchase: true,
      };
      onAddReview(product.id, newRev);
      setReviewSuccess(true);
      setNewComment('');
      setNewUserName('');
      setTimeout(() => {
        setReviewSuccess(false);
        setShowReviewForm(false);
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative border border-stone-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-full transition-colors"
          title="Close Quick View"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-8">
          
          {/* Left Column: Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-[3/4] bg-stone-100 rounded-2xl overflow-hidden shadow-inner border border-stone-100">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-300"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-16 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      activeImage === img ? 'border-rose-800 scale-95 shadow-md' : 'border-stone-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Details & Actions */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                <span className="uppercase tracking-widest font-semibold text-rose-900">{product.category}</span>
                <span className="text-emerald-700 font-medium flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  In Stock ({product.stockCount} left)
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-stone-900">
                {product.name}
              </h2>

              {/* Price & Rating */}
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-stone-900">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-stone-400 line-through">${product.originalPrice}</span>
                  )}
                </div>
                <div className="h-4 w-[1px] bg-stone-200" />
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-semibold text-stone-800">{product.rating}</span>
                  <span className="text-xs text-stone-400">({product.reviewCount} reviews)</span>
                </div>
              </div>

              <p className="mt-4 text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
                {product.description}
              </p>

              {/* Color Selection */}
              <div className="mt-6">
                <label className="block text-xs uppercase tracking-wider text-stone-500 font-semibold mb-2">
                  Color: <strong className="text-stone-900">{selectedColor.name}</strong>
                </label>
                <div className="flex gap-3">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                        selectedColor.name === c.name
                          ? 'border-rose-800 bg-rose-50 text-rose-950 font-semibold'
                          : 'border-stone-200 hover:border-stone-400 text-stone-700'
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full border border-stone-300" style={{ backgroundColor: c.hex }} />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs uppercase tracking-wider text-stone-500 font-semibold">
                    Select Size
                  </label>
                  <button
                    onClick={onOpenSizeGuide}
                    className="text-xs text-rose-900 underline font-medium hover:text-rose-700"
                  >
                    Size & Fit Guide
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                        selectedSize === sz
                          ? 'bg-rose-950 border-rose-950 text-white shadow-md'
                          : 'bg-stone-50 border-stone-200 text-stone-800 hover:border-stone-400'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mt-6 flex items-center gap-4">
                <label className="text-xs uppercase tracking-wider text-stone-500 font-semibold">
                  Quantity
                </label>
                <div className="flex items-center border border-stone-300 rounded-xl overflow-hidden bg-stone-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-stone-600 hover:bg-stone-200 text-sm font-bold"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-xs font-bold text-stone-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-stone-600 hover:bg-stone-200 text-sm font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-stone-100">
              <div className="flex gap-3">
                <button
                  onClick={handleAdd}
                  disabled={isAdded}
                  className={`flex-1 py-3.5 rounded-2xl text-xs font-semibold uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg ${
                    isAdded
                      ? 'bg-emerald-700 text-white'
                      : 'bg-stone-900 hover:bg-stone-800 text-amber-50 shadow-stone-900/20'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-200" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-rose-300" />
                      <span>Add to Bag - ${(product.price * quantity).toFixed(2)}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`p-3.5 rounded-2xl border transition-all ${
                    isWishlisted
                      ? 'bg-rose-700 border-rose-700 text-white'
                      : 'border-stone-300 text-stone-700 hover:border-rose-900 hover:text-rose-900'
                  }`}
                  title="Save to Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-500 pt-2">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-rose-800" />
                  <span>100% Authentic Quality Guarantee</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5 text-rose-800" />
                  <span>Free Returns within 30 days</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Tabs: Specifications & Customer Reviews */}
        <div className="border-t border-stone-200 bg-stone-50/50 p-6 sm:p-8 rounded-b-3xl">
          <div className="flex justify-between items-center border-b border-stone-200 pb-2 mb-4">
            <div className="flex gap-6">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                  activeTab === 'details' ? 'border-b-2 border-rose-900 text-rose-900' : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                Fabric & Care
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                  activeTab === 'reviews' ? 'border-b-2 border-rose-900 text-rose-900' : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                Verified Reviews ({product.reviews.length})
              </button>
            </div>

            {activeTab === 'reviews' && (
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="text-xs text-rose-900 font-semibold flex items-center gap-1 hover:underline"
              >
                <MessageSquarePlus className="w-3.5 h-3.5" />
                <span>{showReviewForm ? 'Cancel Review' : 'Write a Review'}</span>
              </button>
            )}
          </div>

          {activeTab === 'details' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-700">
              <div>
                <strong className="block text-stone-900 uppercase font-semibold mb-1">Material Composition:</strong>
                <p className="font-light">{product.fabric}</p>
              </div>
              <div>
                <strong className="block text-stone-900 uppercase font-semibold mb-1">Garment Care Instructions:</strong>
                <p className="font-light">{product.care}</p>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              
              {/* Submit Review Form */}
              {showReviewForm && (
                <form onSubmit={handleReviewSubmit} className="bg-white p-4 rounded-2xl border border-stone-300 space-y-3">
                  <h4 className="font-serif text-sm font-semibold text-stone-900">Write Your Customer Review</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-stone-600 font-medium mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={newUserName}
                        onChange={(e) => setNewUserName(e.target.value)}
                        placeholder="e.g. Victoria K."
                        className="w-full border border-stone-300 rounded-xl px-3 py-2 outline-none focus:border-rose-800"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-600 font-medium mb-1">Rating</label>
                      <select
                        value={newRating}
                        onChange={(e) => setNewRating(Number(e.target.value))}
                        className="w-full border border-stone-300 rounded-xl px-3 py-2 outline-none focus:border-rose-800 bg-white"
                      >
                        <option value={5}>⭐⭐⭐⭐⭐ (5 Stars - Outstanding)</option>
                        <option value={4}>⭐⭐⭐⭐ (4 Stars - Great)</option>
                        <option value={3}>⭐⭐⭐ (3 Stars - Average)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-stone-600 font-medium text-xs mb-1">Comment</label>
                    <textarea
                      required
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Share details about the fabric, sizing, and drape of this dress..."
                      rows={2}
                      className="w-full border border-stone-300 rounded-xl p-3 text-xs outline-none focus:border-rose-800"
                    />
                  </div>

                  {reviewSuccess ? (
                    <div className="text-xs text-emerald-700 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 flex items-center gap-1 font-semibold">
                      <Check className="w-4 h-4" /> Review published successfully!
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className="bg-rose-900 text-white px-5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-rose-800"
                    >
                      Post Review
                    </button>
                  )}
                </form>
              )}

              {product.reviews.length === 0 ? (
                <p className="text-xs text-stone-500 font-light italic">No reviews submitted yet. Be the first to review!</p>
              ) : (
                product.reviews.map((rev) => (
                  <div key={rev.id} className="bg-white p-3.5 rounded-xl border border-stone-200 text-xs space-y-1">
                    <div className="flex justify-between items-center">
                      <strong className="text-stone-900 font-medium">{rev.userName}</strong>
                      <span className="text-stone-400 text-[10px]">{rev.date}</span>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500 text-[10px]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                    <p className="text-stone-600 font-light italic">"{rev.comment}"</p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
