export type Category = 'All' | 'Evening Wear' | 'Cocktail & Party' | 'Summer & Floral' | 'Casual & Linen' | 'Bridal & Formal' | 'Velvet & Winter Edit';

export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL';

export interface ProductReview {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  colors: { name: string; hex: string }[];
  sizes: Size[];
  description: string;
  fabric: string;
  care: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  isSale?: boolean;
  stockCount: number;
  reviews: ProductReview[];
}

export interface CartItem {
  product: Product;
  selectedSize: Size;
  selectedColor: { name: string; hex: string };
  quantity: number;
}

export interface FilterState {
  category: Category;
  searchQuery: string;
  priceRange: [number, number];
  selectedSizes: Size[];
  selectedColors: string[];
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest';
  inStockOnly: boolean;
}

export interface LookbookItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  categoryLink: Category;
  tag: string;
}

export type InfoModalType = 'shipping' | 'returns' | 'sustainability' | 'stylist' | null;
