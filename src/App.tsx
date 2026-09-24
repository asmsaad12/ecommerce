import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategorySpotlight } from './components/CategorySpotlight';
import { LookbookSection } from './components/LookbookSection';
import { FilterSidebar } from './components/FilterSidebar';
import { ProductCard } from './components/ProductCard';
import { ProductQuickView } from './components/ProductQuickView';
import { CartDrawer } from './components/CartDrawer';
import { WishlistModal } from './components/WishlistModal';
import { CheckoutModal } from './components/CheckoutModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { InfoModals } from './components/InfoModals';
import { Footer } from './components/Footer';

import { PRODUCTS } from './data/products';
import { Product, CartItem, FilterState, Category, Size, InfoModalType, ProductReview } from './types';
import { Sparkles, AlertCircle } from 'lucide-react';

export const App: React.FC = () => {
  // Products Data State
  const [products, setProducts] = useState<Product[]>(PRODUCTS);

  // Search & Filter State
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    category: 'All',
    searchQuery: '',
    priceRange: [0, 700],
    selectedSizes: [],
    selectedColors: [],
    sortBy: 'featured',
    inStockOnly: false,
  });

  // User Cart & Wishlist State
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0],
      selectedSize: 'M',
      selectedColor: PRODUCTS[0].colors[0],
      quantity: 1,
    }
  ]);
  const [wishlist, setWishlist] = useState<Product[]>([PRODUCTS[1]]);

  // Modals & Drawers State
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [activeInfoModal, setActiveInfoModal] = useState<InfoModalType>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Category Selection
  const handleSelectCategory = (category: Category) => {
    setActiveCategory(category);
    setFilters((prev) => ({ ...prev, category }));
  };

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => {
      const updated = { ...prev, ...newFilters };
      if (newFilters.category !== undefined) {
        setActiveCategory(newFilters.category);
      }
      return updated;
    });
  };

  const handleResetFilters = () => {
    setActiveCategory('All');
    setSearchQuery('');
    setFilters({
      category: 'All',
      searchQuery: '',
      priceRange: [0, 700],
      selectedSizes: [],
      selectedColors: [],
      sortBy: 'featured',
      inStockOnly: false,
    });
  };

  // Cart Handlers
  const handleAddToCart = (
    product: Product,
    selectedSize: Size,
    selectedColor: { name: string; hex: string },
    quantity: number = 1
  ) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === selectedSize &&
          item.selectedColor.name === selectedColor.name
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevItems, { product, selectedSize, selectedColor, quantity }];
      }
    });
  };

  const handleUpdateCartQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(index);
      return;
    }
    setCartItems((prev) => {
      const updated = [...prev];
      updated[index].quantity = quantity;
      return updated;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  // Wishlist Handlers
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  // Review Handler
  const handleAddReview = (productId: string, review: ProductReview) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const updatedReviews = [review, ...p.reviews];
          const avgRating = Number(
            (
              updatedReviews.reduce((sum, r) => sum + r.rating, 0) /
              updatedReviews.length
            ).toFixed(1)
          );
          return {
            ...p,
            reviews: updatedReviews,
            rating: avgRating,
            reviewCount: updatedReviews.length,
          };
        }
        return p;
      })
    );

    if (quickViewProduct && quickViewProduct.id === productId) {
      setQuickViewProduct((prev) => {
        if (!prev) return null;
        const updatedReviews = [review, ...prev.reviews];
        return {
          ...prev,
          reviews: updatedReviews,
          reviewCount: updatedReviews.length,
        };
      });
    }
  };

  // Filtering & Sorting Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (filters.category !== 'All' && p.category !== filters.category) return false;

        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchCat = p.category.toLowerCase().includes(q);
          const matchFabric = p.fabric.toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchCat && !matchFabric) return false;
        }

        if (p.price > filters.priceRange[1]) return false;

        if (filters.selectedSizes.length > 0) {
          const hasSize = filters.selectedSizes.some((sz) => p.sizes.includes(sz));
          if (!hasSize) return false;
        }

        if (filters.inStockOnly && p.stockCount <= 0) return false;

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'price-low') return a.price - b.price;
        if (filters.sortBy === 'price-high') return b.price - a.price;
        if (filters.sortBy === 'rating') return b.rating - a.rating;
        if (filters.sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        return 0;
      });
  }, [products, filters, searchQuery]);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col selection:bg-rose-200 selection:text-rose-900">
      
      {/* Top Navigation Bar */}
      <Navbar
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onOpenInfoModal={(type) => setActiveInfoModal(type)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onToggleFilterSidebar={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* Editorial Hero Banner */}
        <Hero onExploreClick={handleSelectCategory} onOpenInfoModal={(type) => setActiveInfoModal(type)} />

        {/* Visual Category Spotlights */}
        <CategorySpotlight onSelectCategory={handleSelectCategory} />

        {/* Lookbook Runway Section */}
        <LookbookSection onSelectCategory={handleSelectCategory} />

        {/* Dress Catalog Section */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-stone-200">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-rose-800 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Handcrafted Dress Collection
              </span>
              <h2 className="font-serif text-3xl font-semibold text-stone-900 mt-1">
                {filters.category === 'All' ? 'All Dress Silhouettes' : filters.category}
              </h2>
            </div>
            
            <p className="text-xs text-stone-500 font-light mt-2 md:mt-0">
              Displaying <strong className="text-stone-900">{filteredProducts.length}</strong> of {products.length} designs
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Filter Sidebar (Desktop) */}
            <div className="hidden lg:block lg:col-span-1">
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                onResetFilters={handleResetFilters}
                totalResultsCount={filteredProducts.length}
              />
            </div>

            {/* Mobile Filter Sidebar Drawer */}
            {isMobileFilterOpen && (
              <div className="fixed inset-0 z-50 lg:hidden bg-stone-950/60 flex justify-end">
                <div className="bg-white w-80 h-full p-6 overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-serif text-lg font-bold">Filters</h3>
                    <button onClick={() => setIsMobileFilterOpen(false)} className="text-xs uppercase font-semibold">Close</button>
                  </div>
                  <FilterSidebar
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onResetFilters={handleResetFilters}
                    totalResultsCount={filteredProducts.length}
                  />
                </div>
              </div>
            )}

            {/* Product Grid */}
            <div className="lg:col-span-3">
              {filteredProducts.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-4 my-8">
                  <div className="w-16 h-16 bg-rose-50 text-rose-800 rounded-full flex items-center justify-center mx-auto">
                    <AlertCircle className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-stone-900">No dresses matched your criteria</h3>
                  <p className="text-xs text-stone-500 font-light max-w-sm mx-auto">
                    Try relaxing your price range, resetting size preferences, or clearing your search term.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="bg-stone-900 text-amber-50 px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition-colors"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isWishlisted={wishlist.some((p) => p.id === product.id)}
                      onToggleWishlist={handleToggleWishlist}
                      onQuickView={setQuickViewProduct}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              )}
            </div>

          </div>

        </section>

      </main>

      {/* Footer */}
      <Footer onOpenInfoModal={(type) => setActiveInfoModal(type)} onOpenSizeGuide={() => setIsSizeGuideOpen(true)} />

      {/* Quick View Modal */}
      <ProductQuickView
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        isWishlisted={quickViewProduct ? wishlist.some((p) => p.id === quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onAddReview={handleAddReview}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onQuickView={setQuickViewProduct}
      />

      {/* Checkout Flow Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onClearCart={() => setCartItems([])}
      />

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />

      {/* Client Support Info Modals */}
      <InfoModals
        type={activeInfoModal}
        onClose={() => setActiveInfoModal(null)}
      />

    </div>
  );
};

export default App;
