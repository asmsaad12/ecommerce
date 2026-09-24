import { Product, LookbookItem } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'aura-01',
    name: 'Seraphina Silk Satin Gown',
    category: 'Evening Wear',
    price: 340,
    originalPrice: 420,
    rating: 4.9,
    reviewCount: 42,
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Emerald Green', hex: '#0e4a36' },
      { name: 'Midnight Navy', hex: '#162544' },
      { name: 'Champagne Gold', hex: '#d4af37' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'An ethereal floor-length gown handcrafted from 100% mulberry silk satin. Features a delicate cowl neckline, thigh-high side slit, and elegant criss-cross back straps designed to turn heads at formal galas.',
    fabric: '100% Pure Mulberry Silk Satin with viscose lining',
    care: 'Dry clean only. Steam on low heat.',
    isNew: true,
    isBestSeller: true,
    isSale: true,
    stockCount: 8,
    reviews: [
      {
        id: 'r1',
        userName: 'Elena Rostova',
        rating: 5,
        date: '2026-08-14',
        comment: 'Absolutely breathtaking fit! Wore this to a black-tie gala and received endless compliments.',
        verifiedPurchase: true
      },
      {
        id: 'r2',
        userName: 'Sophia M.',
        rating: 5,
        date: '2026-07-29',
        comment: 'The silk feels so soft against the skin. Drapes like a dream.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'aura-02',
    name: 'Celeste Velvet Off-Shoulder Midi',
    category: 'Velvet & Winter Edit',
    price: 245,
    rating: 4.8,
    reviewCount: 28,
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Ruby Wine', hex: '#6b1124' },
      { name: 'Obsidian Black', hex: '#121212' }
    ],
    sizes: ['S', 'M', 'L'],
    description: 'Sophisticated off-the-shoulder silhouette in rich plush velvet. Designed with structured boning through the bodice for an ultra-flattering hourglass shape.',
    fabric: '90% Polyester Velvet, 10% Elastane',
    care: 'Professional dry clean.',
    isBestSeller: true,
    stockCount: 12,
    reviews: [
      {
        id: 'r3',
        userName: 'Clara Vance',
        rating: 5,
        date: '2026-09-02',
        comment: 'The boning gives amazing support and waist definition!',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'aura-03',
    name: 'Aurelia Floral Tiered Maxi',
    category: 'Summer & Floral',
    price: 185,
    originalPrice: 220,
    rating: 4.7,
    reviewCount: 35,
    images: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1495385794356-15371f348c31?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Blush Rose', hex: '#e8b4b8' },
      { name: 'Sage Garden', hex: '#8a9a86' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Romantic tiered chiffon maxi dress featuring hand-painted botanical watercolors, a modest V-neckline, and subtle gold threading throughout.',
    fabric: 'Lightweight Crinkle Chiffon with soft cotton lining',
    care: 'Hand wash cold or gentle cycle. Hang dry.',
    isSale: true,
    stockCount: 15,
    reviews: [
      {
        id: 'r4',
        userName: 'Hannah B.',
        rating: 4,
        date: '2026-08-20',
        comment: 'Lovely movement and light material. Perfect for garden weddings!',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'aura-04',
    name: 'Isla Pure Linen Shirtdress',
    category: 'Casual & Linen',
    price: 160,
    rating: 4.6,
    reviewCount: 19,
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Oatmeal Natural', hex: '#d9cdb8' },
      { name: 'Crisp White', hex: '#ffffff' },
      { name: 'Terracotta', hex: '#c85a32' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Effortlessly chic French flax linen shirtdress with shell buttons, cuffed sleeves, and a removable waist tie belt. Ideal for weekend getaways.',
    fabric: '100% Organic French Linen',
    care: 'Machine wash cool on delicate cycle. Warm iron if desired.',
    isNew: true,
    stockCount: 20,
    reviews: [
      {
        id: 'r5',
        userName: 'Maya Lin',
        rating: 5,
        date: '2026-09-10',
        comment: 'Breathable, classy, and gets softer with every wash.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'aura-05',
    name: 'Vivienne Pearl Bridal Mini',
    category: 'Bridal & Formal',
    price: 490,
    originalPrice: 550,
    rating: 5.0,
    reviewCount: 16,
    images: [
      'https://images.unsplash.com/photo-1549062572-544a64fb0c56?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Ivory Pearl', hex: '#fdfbf7' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Showstopping bridal rehearsal or reception dress with hand-sewn faux pearl embellishments, a modern scoop back, and structured corset seams.',
    fabric: 'Heavy Silk Crepe with Pearl Detailing',
    care: 'Specialist dry clean only.',
    isNew: true,
    isSale: true,
    stockCount: 5,
    reviews: [
      {
        id: 'r6',
        userName: 'Charlotte W.',
        rating: 5,
        date: '2026-08-30',
        comment: 'Used this for my rehearsal dinner and received so many compliments!',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'aura-06',
    name: 'Odette Pleated Wrap Midi',
    category: 'Cocktail & Party',
    price: 210,
    rating: 4.8,
    reviewCount: 22,
    images: [
      'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1550639525-c97d455acf70?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Dusty Rose', hex: '#c08497' },
      { name: 'Midnight Navy', hex: '#162544' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Timeless wrap silhouette featuring sunray knife pleats, satin lapels, and a tie belt closure. Flattering on all body shapes.',
    fabric: '100% Satin Polyester',
    care: 'Machine wash gentle. Do not tumble dry.',
    isBestSeller: true,
    stockCount: 14,
    reviews: []
  },
  {
    id: 'aura-07',
    name: 'Genevieve Embroidered Tulle Gown',
    category: 'Evening Wear',
    price: 520,
    rating: 4.9,
    reviewCount: 31,
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Midnight Starlight', hex: '#0f172a' },
      { name: 'Blush Nude', hex: '#ebd8ce' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'An intricate couture ballgown crafted from sheer tulle overlay with 3D floral thread embroidery, crystal bead accents, and an illusion neckline.',
    fabric: 'Fine Italian Tulle with Organza Underlayer',
    care: 'Dry clean only.',
    stockCount: 4,
    reviews: []
  },
  {
    id: 'aura-08',
    name: 'Dalia Ribbed Knit Bodycon',
    category: 'Casual & Linen',
    price: 135,
    originalPrice: 160,
    rating: 4.5,
    reviewCount: 18,
    images: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Sand Beige', hex: '#e2d3c1' },
      { name: 'Olive Leaf', hex: '#556b2f' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Comfortable yet alluring ribbed stretch-knit bodycon dress with side slit detail. Effortlessly transitions from day errands to evening cocktails.',
    fabric: '85% Viscose, 15% Elastane',
    care: 'Machine wash cold flat dry.',
    isSale: true,
    stockCount: 18,
    reviews: []
  },
  {
    id: 'aura-09',
    name: 'Rosalie Jacquard Corset Gown',
    category: 'Evening Wear',
    price: 410,
    rating: 5.0,
    reviewCount: 14,
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Royal Sapphire', hex: '#0f2b5c' },
      { name: 'Crimson Red', hex: '#8b0000' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Opulent floral jacquard ballgown with a structured boned corset, sweetheart bustline, and hidden side seam pockets.',
    fabric: 'Heavyweight Woven Floral Jacquard',
    care: 'Specialist dry clean only.',
    isNew: true,
    stockCount: 6,
    reviews: []
  },
  {
    id: 'aura-10',
    name: 'Camilla Silk Wrap Cocktail Mini',
    category: 'Cocktail & Party',
    price: 225,
    rating: 4.7,
    reviewCount: 20,
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Emerald', hex: '#0e4a36' },
      { name: 'Plum Noir', hex: '#4a1525' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Playful mini wrap dress cut from washed silk crepe. Detailed with tulip sleeve cuffs and an asymmetric draped skirt hem.',
    fabric: '100% Washed Silk Crepe de Chine',
    care: 'Dry clean recommended.',
    stockCount: 11,
    reviews: []
  },
  {
    id: 'aura-11',
    name: 'Serena Satin Slip Dress',
    category: 'Summer & Floral',
    price: 175,
    originalPrice: 200,
    rating: 4.6,
    reviewCount: 27,
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Butter Yellow', hex: '#fdf1b8' },
      { name: 'Lilac Haze', hex: '#c8b8db' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Minimalist 90s-inspired bias cut slip dress with cowl bust line and adjustable spaghetti straps. Layer over a tee or wear solo.',
    fabric: 'Liquid Poly-Satin',
    care: 'Machine wash cool delicate cycle.',
    isSale: true,
    stockCount: 16,
    reviews: []
  },
  {
    id: 'aura-12',
    name: 'Evangeline Tiered Lace Bridal Gown',
    category: 'Bridal & Formal',
    price: 680,
    rating: 5.0,
    reviewCount: 9,
    images: [
      'https://images.unsplash.com/photo-1549062572-544a64fb0c56?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Pure Ivory', hex: '#ffffff' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Ethereal bohemian wedding gown with Chantilly lace overlays, sheer bishop sleeves, and a sweeping chapel train.',
    fabric: 'French Chantilly Lace & Silk Organza',
    care: 'Specialist bridal preservation dry clean.',
    isNew: true,
    stockCount: 3,
    reviews: []
  }
];

export const LOOKBOOK_ITEMS: LookbookItem[] = [
  {
    id: 'lb-1',
    title: 'The Autumn Gala Edit',
    subtitle: 'Floor-sweeping mulberry silk gowns for unforgettable black-tie evenings.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80',
    categoryLink: 'Evening Wear',
    tag: 'Haute Couture 2026'
  },
  {
    id: 'lb-2',
    title: 'French Riviera Linen',
    subtitle: 'Breathable organic linen shirtdresses and sun-kissed maxis.',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80',
    categoryLink: 'Casual & Linen',
    tag: 'Resort Edit'
  },
  {
    id: 'lb-3',
    title: 'Modern Bridal & Reception',
    subtitle: 'Pearl-embellished minis and Chantilly lace gowns for your special day.',
    image: 'https://images.unsplash.com/photo-1549062572-544a64fb0c56?auto=format&fit=crop&w=1000&q=80',
    categoryLink: 'Bridal & Formal',
    tag: 'Atelier Bridal'
  }
];
