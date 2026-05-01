export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  subcategory?: string;
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  rating: number;
  reviewCount: number;
  reviews: Review[];
  inStock: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  isSale?: boolean;
  tags: string[];
}

export const categories = [
  { id: "jackets", name: "Jackets", count: 24 },
  { id: "shirts", name: "Shirts", count: 18 },
  { id: "shoes", name: "Shoes", count: 32 },
  { id: "watches", name: "Watches", count: 15 },
  { id: "jewelry", name: "Jewelry", count: 21 },
  { id: "accessories", name: "Accessories", count: 28 },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Leather Jacket",
    description: "Crafted from the finest Italian leather, this jacket embodies timeless elegance. Features a sleek silhouette with hand-stitched details and premium hardware. Perfect for both casual and formal occasions.",
    price: 599,
    originalPrice: 799,
    image: "/images/products/jacket-1.jpg",
    images: [
      "/images/products/jacket-1.jpg",
      "/images/products/jacket-2.jpg",
      "/images/products/jacket-3.jpg",
    ],
    category: "Jackets",
    subcategory: "Leather",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#0a0a0a" },
      { name: "Brown", hex: "#8B4513" },
      { name: "Navy", hex: "#1a1a3a" },
    ],
    rating: 4.8,
    reviewCount: 124,
    reviews: [
      {
        id: "r1",
        userId: "u1",
        userName: "Michael R.",
        rating: 5,
        comment: "Exceptional quality. The leather is buttery soft and the fit is perfect. Worth every penny.",
        date: "2024-03-15",
        verified: true,
      },
      {
        id: "r2",
        userId: "u2",
        userName: "Sarah K.",
        rating: 5,
        comment: "Bought this for my husband and he absolutely loves it. The craftsmanship is outstanding.",
        date: "2024-03-10",
        verified: true,
      },
      {
        id: "r3",
        userId: "u3",
        userName: "James L.",
        rating: 4,
        comment: "Great jacket, runs slightly large. Would recommend sizing down.",
        date: "2024-03-05",
        verified: true,
      },
    ],
    inStock: true,
    isBestSeller: true,
    isSale: true,
    tags: ["leather", "premium", "winter", "bestseller"],
  },
  {
    id: "2",
    name: "Merino Wool Overcoat",
    description: "Luxurious merino wool overcoat with a contemporary cut. Features a notch lapel, single-breasted closure, and fully lined interior. The perfect statement piece for the discerning gentleman.",
    price: 450,
    image: "/images/products/jacket-2.jpg",
    images: [
      "/images/products/jacket-2.jpg",
      "/images/products/jacket-3.jpg",
    ],
    category: "Jackets",
    subcategory: "Wool",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Charcoal", hex: "#36454F" },
      { name: "Camel", hex: "#C19A6B" },
    ],
    rating: 4.6,
    reviewCount: 89,
    reviews: [
      {
        id: "r4",
        userId: "u4",
        userName: "David W.",
        rating: 5,
        comment: "The wool quality is superb. Keeps me warm without being too heavy.",
        date: "2024-02-28",
        verified: true,
      },
    ],
    inStock: true,
    isNew: true,
    tags: ["wool", "overcoat", "winter", "new"],
  },
  {
    id: "3",
    name: "Classic Oxford Shirt",
    description: "A wardrobe essential crafted from 100% Egyptian cotton. Features a button-down collar, chest pocket, and tailored fit. Perfect for both office and weekend wear.",
    price: 125,
    originalPrice: 150,
    image: "/images/products/shirt-1.jpg",
    images: [
      "/images/products/shirt-1.jpg",
      "/images/products/shirt-2.jpg",
    ],
    category: "Shirts",
    subcategory: "Formal",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Light Blue", hex: "#ADD8E6" },
      { name: "Pink", hex: "#FFB6C1" },
    ],
    rating: 4.7,
    reviewCount: 203,
    reviews: [
      {
        id: "r5",
        userId: "u5",
        userName: "Alex M.",
        rating: 5,
        comment: "Best shirt I've ever owned. The fabric feels incredible.",
        date: "2024-03-12",
        verified: true,
      },
    ],
    inStock: true,
    isBestSeller: true,
    isSale: true,
    tags: ["cotton", "formal", "classic", "bestseller"],
  },
  {
    id: "4",
    name: "Italian Silk Shirt",
    description: "Exquisite silk shirt handcrafted in Italy. Features mother-of-pearl buttons and a relaxed fit. The epitome of understated luxury.",
    price: 295,
    image: "/images/products/shirt-2.jpg",
    images: [
      "/images/products/shirt-2.jpg",
      "/images/products/shirt-1.jpg",
    ],
    category: "Shirts",
    subcategory: "Luxury",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Ivory", hex: "#FFFFF0" },
      { name: "Black", hex: "#0a0a0a" },
    ],
    rating: 4.9,
    reviewCount: 67,
    reviews: [],
    inStock: true,
    isNew: true,
    tags: ["silk", "luxury", "italian", "new"],
  },
  {
    id: "5",
    name: "Handcrafted Oxford Shoes",
    description: "Traditional Oxford shoes handcrafted by master artisans. Features full-grain leather, Goodyear welt construction, and leather soles. Built to last a lifetime.",
    price: 425,
    originalPrice: 495,
    image: "/images/products/shoe-1.jpg",
    images: [
      "/images/products/shoe-1.jpg",
      "/images/products/shoe-2.jpg",
      "/images/products/shoe-3.jpg",
    ],
    category: "Shoes",
    subcategory: "Formal",
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: [
      { name: "Black", hex: "#0a0a0a" },
      { name: "Cognac", hex: "#834333" },
    ],
    rating: 4.8,
    reviewCount: 156,
    reviews: [
      {
        id: "r6",
        userId: "u6",
        userName: "Robert H.",
        rating: 5,
        comment: "These shoes are a work of art. Comfortable right out of the box.",
        date: "2024-03-08",
        verified: true,
      },
    ],
    inStock: true,
    isBestSeller: true,
    isSale: true,
    tags: ["leather", "formal", "handcrafted", "bestseller"],
  },
  {
    id: "6",
    name: "Premium Sneakers",
    description: "Minimalist luxury sneakers crafted from premium Italian leather. Features a cushioned insole and durable rubber outsole. Effortless style for the modern man.",
    price: 325,
    image: "/images/products/shoe-2.jpg",
    images: [
      "/images/products/shoe-2.jpg",
      "/images/products/shoe-3.jpg",
    ],
    category: "Shoes",
    subcategory: "Casual",
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Black", hex: "#0a0a0a" },
      { name: "Gray", hex: "#808080" },
    ],
    rating: 4.6,
    reviewCount: 98,
    reviews: [],
    inStock: true,
    isNew: true,
    tags: ["leather", "casual", "sneakers", "new"],
  },
  {
    id: "7",
    name: "Running Performance Shoes",
    description: "High-performance running shoes with advanced cushioning technology. Lightweight, breathable, and designed for optimal comfort during long runs.",
    price: 189,
    originalPrice: 220,
    image: "/images/products/sports-1.jpg",
    images: [
      "/images/products/sports-1.jpg",
      "/images/products/sports-2.jpg",
    ],
    category: "Shoes",
    subcategory: "Sports",
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: [
      { name: "Black/Red", hex: "#0a0a0a" },
      { name: "White/Blue", hex: "#FFFFFF" },
    ],
    rating: 4.5,
    reviewCount: 234,
    reviews: [],
    inStock: true,
    isSale: true,
    tags: ["sports", "running", "performance"],
  },
  {
    id: "8",
    name: "Swiss Automatic Watch",
    description: "Precision Swiss-made automatic watch with sapphire crystal and stainless steel case. Features a 42mm dial and water resistance up to 100m. A timeless masterpiece.",
    price: 1250,
    originalPrice: 1500,
    image: "/images/products/watch-1.jpg",
    images: [
      "/images/products/watch-1.jpg",
      "/images/products/watch-2.jpg",
      "/images/products/watch-3.jpg",
    ],
    category: "Watches",
    subcategory: "Luxury",
    colors: [
      { name: "Silver/Black", hex: "#C0C0C0" },
      { name: "Gold/Brown", hex: "#FFD700" },
    ],
    rating: 4.9,
    reviewCount: 78,
    reviews: [
      {
        id: "r7",
        userId: "u7",
        userName: "Thomas B.",
        rating: 5,
        comment: "Absolutely stunning timepiece. The attention to detail is remarkable.",
        date: "2024-03-01",
        verified: true,
      },
    ],
    inStock: true,
    isBestSeller: true,
    isSale: true,
    tags: ["luxury", "swiss", "automatic", "bestseller"],
  },
  {
    id: "9",
    name: "Chronograph Sport Watch",
    description: "Professional-grade chronograph with tachymeter bezel. Features luminous hands, date display, and 50m water resistance. Perfect for the active lifestyle.",
    price: 695,
    image: "/images/products/watch-2.jpg",
    images: [
      "/images/products/watch-2.jpg",
      "/images/products/watch-3.jpg",
    ],
    category: "Watches",
    subcategory: "Sport",
    colors: [
      { name: "Steel/Blue", hex: "#4682B4" },
      { name: "Black/Orange", hex: "#0a0a0a" },
    ],
    rating: 4.7,
    reviewCount: 112,
    reviews: [],
    inStock: true,
    isNew: true,
    tags: ["sport", "chronograph", "new"],
  },
  {
    id: "10",
    name: "Rose Gold Diamond Earrings",
    description: "Elegant rose gold earrings adorned with hand-selected diamonds. Features a classic drop design with secure push-back closure. Total diamond weight: 0.5 carats.",
    price: 895,
    originalPrice: 1100,
    image: "/images/products/jewellery-1.jpg",
    images: [
      "/images/products/jewellery-1.jpg",
      "/images/products/jewellery-2.jpg",
    ],
    category: "Jewelry",
    subcategory: "Earrings",
    colors: [
      { name: "Rose Gold", hex: "#B76E79" },
      { name: "White Gold", hex: "#E8E8E8" },
    ],
    rating: 4.8,
    reviewCount: 45,
    reviews: [],
    inStock: true,
    isBestSeller: true,
    isSale: true,
    tags: ["gold", "diamond", "earrings", "bestseller"],
  },
  {
    id: "11",
    name: "Silver Statement Necklace",
    description: "Bold sterling silver necklace with an intricate chain design. Handcrafted by skilled artisans. A stunning statement piece for any occasion.",
    price: 450,
    image: "/images/products/jewellery-2.jpg",
    images: [
      "/images/products/jewellery-2.jpg",
      "/images/products/jewellery-3.jpg",
    ],
    category: "Jewelry",
    subcategory: "Necklaces",
    colors: [
      { name: "Silver", hex: "#C0C0C0" },
    ],
    rating: 4.6,
    reviewCount: 67,
    reviews: [],
    inStock: true,
    isNew: true,
    tags: ["silver", "statement", "necklace", "new"],
  },
  {
    id: "12",
    name: "Designer Leather Belt",
    description: "Premium Italian leather belt with brushed metal buckle. Features a sleek, minimalist design that complements any outfit. Width: 35mm.",
    price: 175,
    originalPrice: 200,
    image: "/images/products/belt.jpg",
    images: [
      "/images/products/belt.jpg",
    ],
    category: "Accessories",
    subcategory: "Belts",
    sizes: ["30", "32", "34", "36", "38", "40"],
    colors: [
      { name: "Black", hex: "#0a0a0a" },
      { name: "Brown", hex: "#8B4513" },
    ],
    rating: 4.7,
    reviewCount: 189,
    reviews: [],
    inStock: true,
    isSale: true,
    tags: ["leather", "belt", "accessories"],
  },
  {
    id: "13",
    name: "Cashmere Sweater",
    description: "Ultra-soft 100% cashmere sweater with a relaxed fit. Features ribbed cuffs and hem. The perfect layer for cooler days.",
    price: 395,
    image: "/images/products/clothes-1.jpg",
    images: [
      "/images/products/clothes-1.jpg",
      "/images/products/clothes-2.jpg",
    ],
    category: "Jackets",
    subcategory: "Knitwear",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Charcoal", hex: "#36454F" },
      { name: "Navy", hex: "#1a1a3a" },
      { name: "Cream", hex: "#FFFDD0" },
    ],
    rating: 4.8,
    reviewCount: 134,
    reviews: [],
    inStock: true,
    isBestSeller: true,
    tags: ["cashmere", "knitwear", "luxury", "bestseller"],
  },
  {
    id: "14",
    name: "Tailored Wool Trousers",
    description: "Impeccably tailored trousers in fine Italian wool. Features a flat front, tapered leg, and subtle stretch for comfort. Dry clean only.",
    price: 275,
    image: "/images/products/clothes-2.jpg",
    images: [
      "/images/products/clothes-2.jpg",
      "/images/products/clothes-3.jpg",
    ],
    category: "Shirts",
    subcategory: "Trousers",
    sizes: ["28", "30", "32", "34", "36", "38"],
    colors: [
      { name: "Charcoal", hex: "#36454F" },
      { name: "Navy", hex: "#1a1a3a" },
      { name: "Black", hex: "#0a0a0a" },
    ],
    rating: 4.6,
    reviewCount: 98,
    reviews: [],
    inStock: true,
    isNew: true,
    tags: ["wool", "tailored", "formal", "new"],
  },
  {
    id: "15",
    name: "Luxury Perfume Collection",
    description: "An exquisite blend of rare ingredients creating a sophisticated, long-lasting fragrance. Notes of bergamot, sandalwood, and amber. 100ml bottle.",
    price: 185,
    originalPrice: 220,
    image: "/images/products/perfume.jpg",
    images: [
      "/images/products/perfume.jpg",
    ],
    category: "Accessories",
    subcategory: "Fragrances",
    sizes: ["50ml", "100ml"],
    rating: 4.9,
    reviewCount: 256,
    reviews: [
      {
        id: "r8",
        userId: "u8",
        userName: "Elena V.",
        rating: 5,
        comment: "This fragrance is divine. I receive compliments every time I wear it.",
        date: "2024-03-14",
        verified: true,
      },
    ],
    inStock: true,
    isBestSeller: true,
    isSale: true,
    tags: ["fragrance", "luxury", "bestseller"],
  },
  {
    id: "16",
    name: "Suede Chelsea Boots",
    description: "Classic Chelsea boots in premium Italian suede. Features elastic side panels and a comfortable block heel. A versatile addition to any wardrobe.",
    price: 385,
    image: "/images/products/shoe-4.jpg",
    images: [
      "/images/products/shoe-4.jpg",
      "/images/products/shoe-5.jpg",
    ],
    category: "Shoes",
    subcategory: "Boots",
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: [
      { name: "Tan", hex: "#D2B48C" },
      { name: "Black", hex: "#0a0a0a" },
      { name: "Gray", hex: "#808080" },
    ],
    rating: 4.7,
    reviewCount: 87,
    reviews: [],
    inStock: true,
    isNew: true,
    tags: ["suede", "boots", "chelsea", "new"],
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );
};

export const getNewArrivals = (): Product[] => {
  return products.filter((p) => p.isNew);
};

export const getBestSellers = (): Product[] => {
  return products.filter((p) => p.isBestSeller);
};

export const getSaleProducts = (): Product[] => {
  return products.filter((p) => p.isSale);
};

export const getRelatedProducts = (productId: string, limit = 4): Product[] => {
  const product = getProductById(productId);
  if (!product) return [];
  
  return products
    .filter((p) => p.id !== productId && p.category === product.category)
    .slice(0, limit);
};

export const filterProducts = (
  filters: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    sizes?: string[];
    colors?: string[];
    rating?: number;
    search?: string;
  },
  sortBy: string = "featured"
): Product[] => {
  let filtered = [...products];

  if (filters.category) {
    filtered = filtered.filter(
      (p) => p.category.toLowerCase() === filters.category!.toLowerCase()
    );
  }

  if (filters.minPrice !== undefined) {
    filtered = filtered.filter((p) => p.price >= filters.minPrice!);
  }

  if (filters.maxPrice !== undefined) {
    filtered = filtered.filter((p) => p.price <= filters.maxPrice!);
  }

  if (filters.sizes && filters.sizes.length > 0) {
    filtered = filtered.filter(
      (p) => p.sizes && p.sizes.some((s) => filters.sizes!.includes(s))
    );
  }

  if (filters.colors && filters.colors.length > 0) {
    filtered = filtered.filter(
      (p) =>
        p.colors && p.colors.some((c) => filters.colors!.includes(c.name))
    );
  }

  if (filters.rating) {
    filtered = filtered.filter((p) => p.rating >= filters.rating!);
  }

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower) ||
        p.category.toLowerCase().includes(searchLower)
    );
  }

  switch (sortBy) {
    case "price-low":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "newest":
      filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      break;
    case "rating":
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case "popular":
      filtered.sort((a, b) => b.reviewCount - a.reviewCount);
      break;
    default:
      filtered.sort(
        (a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0)
      );
  }

  return filtered;
};
