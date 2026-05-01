"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { useWishlistStore } from "@/stores/wishlist-store";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import type { Product } from "@/lib/data/products";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const addToCart = useCartStore((state) => state.addItem);
  const { toggleItem, isInWishlist } = useWishlistStore();

  const isWishlisted = isInWishlist(product.id);
  const discount = product.originalPrice
    ? calculateDiscount(product.originalPrice, product.price)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      quantity: 1,
      size: product.sizes?.[0],
      color: product.colors?.[0]?.name,
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.id}`}>
        {/* Image Container */}
        <div className="relative aspect-[3/4] bg-cream-dark overflow-hidden mb-4">
          {/* Animated Border Drawing Effect */}
          <span className="absolute inset-0 pointer-events-none">
            {/* Top border */}
            <span className="absolute top-0 left-0 h-[2px] w-0 bg-gold group-hover:w-full transition-all duration-300 ease-out" />
            {/* Right border */}
            <span className="absolute top-0 right-0 w-[2px] h-0 bg-gold group-hover:h-full transition-all duration-300 ease-out delay-150" />
            {/* Bottom border */}
            <span className="absolute bottom-0 right-0 h-[2px] w-0 bg-gold group-hover:w-full transition-all duration-300 ease-out delay-300" />
            {/* Left border */}
            <span className="absolute bottom-0 left-0 w-[2px] h-0 bg-gold group-hover:h-full transition-all duration-300 ease-out delay-[450ms]" />
          </span>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <span className="px-3 py-1 bg-luxe-black text-white text-xs font-medium uppercase tracking-wider">
                New
              </span>
            )}
            {discount > 0 && (
              <span className="px-3 py-1 bg-gold text-luxe-black text-xs font-medium uppercase tracking-wider">
                -{discount}%
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <motion.button
            onClick={handleToggleWishlist}
            whileTap={{ scale: 0.9 }}
            className={`absolute top-3 right-3 p-2.5 rounded-full transition-all duration-300 ${
              isWishlisted
                ? "bg-gold text-luxe-black"
                : "bg-white/90 text-luxe-black hover:bg-gold"
            }`}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`}
            />
          </motion.button>

          {/* Quick Add Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-4 left-4 right-4"
          >
            <motion.button
              onClick={handleAddToCart}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-luxe-black text-white text-sm font-medium uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-gold hover:text-luxe-black transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Bag
            </motion.button>
          </motion.div>
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          <p className="text-xs text-gray uppercase tracking-wider">
            {product.category}
          </p>
          <h3 className="font-medium text-luxe-black group-hover:text-gold transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(product.rating)
                    ? "text-gold fill-gold"
                    : "text-gray-light"
                }`}
              />
            ))}
            <span className="text-xs text-gray ml-1">
              ({product.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="font-semibold text-luxe-black">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 pt-1">
              {product.colors.slice(0, 4).map((color) => (
                <div
                  key={color.name}
                  className="w-4 h-4 rounded-full border border-gray-light"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-xs text-gray">
                  +{product.colors.length - 4}
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
