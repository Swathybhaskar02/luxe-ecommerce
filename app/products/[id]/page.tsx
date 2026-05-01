"use client";

import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Heart,
  ShoppingBag,
  Minus,
  Plus,
  Star,
  Truck,
  RotateCcw,
  Shield,
  ChevronRight,
  Check,
} from "lucide-react";
import { getProductById, getRelatedProducts } from "@/lib/data/products";
import { useCartStore } from "@/stores/cart-store";
import { useWishlistStore } from "@/stores/wishlist-store";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import ProductCard from "@/components/products/ProductCard";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const product = getProductById(id);
  const relatedProducts = getRelatedProducts(id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "reviews">("description");

  const addToCart = useCartStore((state) => state.addItem);
  const { toggleItem, isInWishlist } = useWishlistStore();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display mb-4">Product not found</h1>
          <Link href="/products" className="btn-primary">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);
  const discount = product.originalPrice
    ? calculateDiscount(product.originalPrice, product.price)
    : 0;

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      quantity,
      size: selectedSize || product.sizes?.[0],
      color: selectedColor || product.colors?.[0]?.name,
    });
  };

  const handleToggleWishlist = () => {
    toggleItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      category: product.category,
    });
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-light">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray hover:text-luxe-black">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray" />
            <Link href="/products" className="text-gray hover:text-luxe-black">
              Shop
            </Link>
            <ChevronRight className="w-4 h-4 text-gray" />
            <Link
              href={`/products?category=${product.category.toLowerCase()}`}
              className="text-gray hover:text-luxe-black"
            >
              {product.category}
            </Link>
            <ChevronRight className="w-4 h-4 text-gray" />
            <span className="text-luxe-black font-medium truncate max-w-[200px]">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Product Details */}
      <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="relative aspect-[4/5] bg-cream-dark overflow-hidden">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-contain p-6"
                priority
              />
              {discount > 0 && (
                <span className="absolute top-4 left-4 px-4 py-2 bg-gold text-luxe-black text-sm font-medium uppercase">
                  -{discount}% Off
                </span>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-24 flex-shrink-0 bg-cream-dark overflow-hidden border-2 transition-colors ${
                      selectedImage === index
                        ? "border-luxe-black"
                        : "border-transparent hover:border-gray-light"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-contain p-1"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:sticky lg:top-32 lg:self-start space-y-6"
          >
            {/* Category & Name */}
            <div>
              <p className="text-sm text-gold uppercase tracking-wider mb-2">
                {product.category}
              </p>
              <h1 className="text-3xl lg:text-4xl font-display mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? "text-gold fill-gold"
                          : "text-gray-light"
                      }`}
                    />
                  ))}
                  <span className="text-sm font-medium ml-2">
                    {product.rating}
                  </span>
                </div>
                <span className="text-sm text-gray">
                  {product.reviewCount} Reviews
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-3xl font-semibold">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-dark leading-relaxed">{product.description}</p>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h4 className="text-sm font-medium uppercase tracking-wider mb-3">
                  Color:{" "}
                  <span className="font-normal normal-case">
                    {selectedColor || product.colors[0].name}
                  </span>
                </h4>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        (selectedColor || product.colors![0].name) === color.name
                          ? "border-luxe-black scale-110"
                          : "border-transparent hover:scale-110"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {(selectedColor || product.colors![0].name) === color.name && (
                        <Check
                          className={`w-5 h-5 mx-auto ${
                            color.name === "White" ? "text-luxe-black" : "text-white"
                          }`}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium uppercase tracking-wider">
                    Size:{" "}
                    <span className="font-normal normal-case">
                      {selectedSize || product.sizes[0]}
                    </span>
                  </h4>
                  <button className="text-sm text-gray hover:text-luxe-black underline">
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[48px] px-4 py-3 border text-sm font-medium transition-colors ${
                        (selectedSize || product.sizes![0]) === size
                          ? "border-luxe-black bg-luxe-black text-white"
                          : "border-gray-light hover:border-luxe-black"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Quantity */}
              <div className="flex items-center border border-gray-light">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-4 hover:bg-cream-dark transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-6 font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-4 hover:bg-cream-dark transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart */}
              <motion.button
                onClick={handleAddToCart}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 btn-primary flex items-center justify-center gap-3"
              >
                <ShoppingBag className="w-5 h-5" />
                Add to Bag
              </motion.button>

              {/* Wishlist */}
              <motion.button
                onClick={handleToggleWishlist}
                whileTap={{ scale: 0.9 }}
                className={`p-4 border transition-colors ${
                  isWishlisted
                    ? "bg-gold border-gold text-luxe-black"
                    : "border-gray-light hover:border-luxe-black"
                }`}
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
              </motion.button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-light">
              <div className="text-center">
                <Truck className="w-6 h-6 mx-auto mb-2 text-gold" />
                <p className="text-xs text-gray">Free Shipping</p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-6 h-6 mx-auto mb-2 text-gold" />
                <p className="text-xs text-gray">30-Day Returns</p>
              </div>
              <div className="text-center">
                <Shield className="w-6 h-6 mx-auto mb-2 text-gold" />
                <p className="text-xs text-gray">2-Year Warranty</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs: Description & Reviews */}
        <div className="mt-16 lg:mt-24">
          <div className="flex border-b border-gray-light">
            <button
              onClick={() => setActiveTab("description")}
              className={`px-6 py-4 text-sm font-medium uppercase tracking-wider transition-colors ${
                activeTab === "description"
                  ? "border-b-2 border-luxe-black text-luxe-black"
                  : "text-gray hover:text-luxe-black"
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`px-6 py-4 text-sm font-medium uppercase tracking-wider transition-colors ${
                activeTab === "reviews"
                  ? "border-b-2 border-luxe-black text-luxe-black"
                  : "text-gray hover:text-luxe-black"
              }`}
            >
              Reviews ({product.reviewCount})
            </button>
          </div>

          <div className="py-8">
            {activeTab === "description" ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl"
              >
                <p className="text-gray-dark leading-relaxed mb-6">
                  {product.description}
                </p>
                <h4 className="font-medium mb-4">Product Details</h4>
                <ul className="space-y-2 text-gray-dark">
                  <li>Premium quality materials</li>
                  <li>Handcrafted by skilled artisans</li>
                  <li>Designed for comfort and style</li>
                  <li>Easy care instructions included</li>
                </ul>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {/* Review Summary */}
                <div className="flex flex-col md:flex-row gap-8 mb-8 pb-8 border-b border-gray-light">
                  <div className="text-center md:text-left">
                    <div className="text-5xl font-display mb-2">{product.rating}</div>
                    <div className="flex items-center justify-center md:justify-start gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(product.rating)
                              ? "text-gold fill-gold"
                              : "text-gray-light"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray">
                      Based on {product.reviewCount} reviews
                    </p>
                  </div>
                </div>

                {/* Reviews List */}
                {product.reviews.length > 0 ? (
                  <div className="space-y-6">
                    {product.reviews.map((review) => (
                      <div
                        key={review.id}
                        className="pb-6 border-b border-gray-light last:border-0"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-cream-dark rounded-full flex items-center justify-center font-medium">
                              {review.userName.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium">{review.userName}</p>
                              <div className="flex items-center gap-2">
                                <div className="flex gap-0.5">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-3 h-3 ${
                                        i < review.rating
                                          ? "text-gold fill-gold"
                                          : "text-gray-light"
                                      }`}
                                    />
                                  ))}
                                </div>
                                {review.verified && (
                                  <span className="text-xs text-green-600 flex items-center gap-1">
                                    <Check className="w-3 h-3" />
                                    Verified
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <span className="text-sm text-gray">{review.date}</span>
                        </div>
                        <p className="text-gray-dark">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray text-center py-8">
                    No reviews yet. Be the first to review this product!
                  </p>
                )}
              </motion.div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 lg:mt-24">
            <h2 className="text-3xl font-display mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
              {relatedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
