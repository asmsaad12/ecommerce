import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, Menu, X, Sparkles, SlidersHorizontal, Ruler, Truck, ShieldCheck, RefreshCw } from 'lucide-react';
import { Category, InfoModalType } from '../types';

interface NavbarProps {
  activeCategory: Category;
  onSelectCategory: (category: Category) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSizeGuide: () => void;
  onOpenInfoModal: (type: InfoModalType) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onToggleFilterSidebar: () => void;
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

export const Navbar: React.FC<NavbarProps> = ({
  activeCategory,
  onSelectCategory,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSizeGuide,
  onOpenInfoModal,
  searchQuery,
  onSearchChange,
  onToggleFilterSidebar,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#faf8f5]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-[#1e1b18] text-amber-50 text-[11px] py-2 px-4 text-center tracking-widest uppercase flex items-center justify-center gap-2 font-light">
        <Sparkles className="w-3.5 h-3.5 text-rose-300 animate-pulse" />
        <span>Complimentary Express Worldwide Shipping on Orders Over $150 • Code: <strong className="text-rose-200">AURA15</strong></span>
        <div className="hidden md:flex items-center gap-4 ml-6 border-l border-stone-700 pl-6 text-[10px] text-stone-400">
          <button onClick={() => onOpenInfoModal('shipping')} className="hover:text-amber-100 flex items-center gap-1">
            <Truck className="w-3 h-3 text-rose-300" /> Shipping Info
          </button>
          <button onClick={() => onOpenInfoModal('returns')} className="hover:text-amber-100 flex items-center gap-1">
            <RefreshCw className="w-3 h-3 text-rose-300" /> 30-Day Returns
          </button>
          <button onClick={() => onOpenInfoModal('sustainability')} className="hover:text-amber-100 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-rose-300" /> Silk Ethics
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile Menu & Filter Icon */}
          <div className="flex items-center lg:hidden gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-stone-700 hover:text-stone-950 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <button
              onClick={onToggleFilterSidebar}
              className="p-2 text-stone-700 hover:text-stone-950 focus:outline-none lg:hidden"
              title="Filters"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>

          {/* Brand Logo */}
          <div className="flex-1 lg:flex-initial text-center lg:text-left">
            <a href="#" className="inline-block">
              <span className="font-serif text-2xl sm:text-3xl tracking-[0.2em] font-semibold text-stone-900 uppercase">
                AURA
              </span>
              <span className="block text-[10px] tracking-[0.35em] text-rose-800 uppercase font-medium -mt-1">
                ATELIER DRESSES
              </span>
            </a>
          </div>

          {/* Desktop Categories Link List */}
          <nav className="hidden lg:flex items-center space-x-6">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`text-[11px] uppercase tracking-widest transition-all font-medium py-1 relative ${
                  activeCategory === cat
                    ? 'text-rose-900 font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-rose-800'
                    : 'text-stone-600 hover:text-stone-950'
                }`}
              >
                {cat}
              </button>
            ))}
          </nav>

          {/* Actions Bar (Search, Size Guide, Wishlist, Cart) */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            
            {/* Search Input Toggle */}
            <div className="relative">
              {isSearchOpen ? (
                <div className="flex items-center bg-white border border-stone-300 rounded-full px-3 py-1.5 shadow-sm w-44 sm:w-64 transition-all">
                  <Search className="w-4 h-4 text-stone-400 mr-2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search silk gowns, linen..."
                    className="w-full text-xs text-stone-800 bg-transparent outline-none placeholder:text-stone-400"
                    autoFocus
                  />
                  <button onClick={() => { setIsSearchOpen(false); onSearchChange(''); }}>
                    <X className="w-4 h-4 text-stone-400 hover:text-stone-700" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-stone-700 hover:text-rose-900 transition-colors"
                  title="Search dresses"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Size Guide Button */}
            <button
              onClick={onOpenSizeGuide}
              className="hidden sm:flex items-center gap-1 text-xs text-stone-600 hover:text-rose-900 transition-colors py-1 px-2.5 rounded-full border border-stone-300/70 bg-white"
              title="Size Guide"
            >
              <Ruler className="w-3.5 h-3.5 text-rose-800" />
              <span>Size Guide</span>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="p-2 text-stone-700 hover:text-rose-900 relative transition-colors"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-700 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-amber-50 px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all shadow-sm"
              title="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 text-rose-300" />
              <span className="hidden sm:inline">Bag</span>
              <span className="bg-rose-800 text-white px-2 py-0.5 rounded-full text-[10px] font-bold">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-stone-50 border-b border-stone-200 px-4 pt-4 pb-6 space-y-4 transition-all animate-fadeIn">
          <div className="flex justify-between items-center pb-2 border-b border-stone-200">
            <span className="text-[11px] uppercase tracking-widest text-stone-400 font-semibold">Explore Categories</span>
            <button
              onClick={onOpenSizeGuide}
              className="flex items-center gap-1 text-xs text-rose-900 font-semibold underline"
            >
              <Ruler className="w-3.5 h-3.5" /> Size Guide
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  onSelectCategory(cat);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 text-xs rounded-lg transition-colors font-medium ${
                  activeCategory === cat
                    ? 'bg-rose-950 text-white font-semibold'
                    : 'bg-white text-stone-700 hover:bg-stone-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-stone-200 flex justify-between text-xs text-stone-600">
            <button onClick={() => { onOpenInfoModal('shipping'); setIsMobileMenuOpen(false); }}>Shipping Info</button>
            <button onClick={() => { onOpenInfoModal('returns'); setIsMobileMenuOpen(false); }}>Returns</button>
            <button onClick={() => { onOpenInfoModal('stylist'); setIsMobileMenuOpen(false); }}>Book Stylist</button>
          </div>
        </div>
      )}
    </header>
  );
};
