"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, X, ArrowRight } from "lucide-react";
import { useWishlistStore } from "@/stores/wishlist-store";
import { useCartStore } from "@/stores/cart-store";
import { formatPrice } from "@/lib/utils";
import { getProductById } from "@/lib/data/products";

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const addToCart = useCartStore((state) => state.addItem);

  const handleMoveToCart = (item: typeof items[0]) => {
    const product = getProductById(item.productId);
    addToCart({
      productId: item.productId,
      name: item.name,
      price: item.price,
      originalPrice: item.originalPrice,
      image: item.image,
      quantity: 1,
      size: product?.sizes?.[0],
      color: product?.colors?.[0]?.name,
    });
    removeItem(item.productId);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-cream py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-md mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Heart className="w-20 h-20 mx-auto text-gray-light mb-6" />
              <h1 className="text-3xl font-display mb-4">Your Wishlist is Empty</h1>
              <p className="text-gray mb-8">
                Save your favorite items here to find them easily later.
              </p>
              <Link href="/products" className="btn-primary inline-flex items-center gap-2">
                Explore Products
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-8 lg:py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl lg:text-4xl font-display"
          >
            My Wishlist
            <span className="text-lg font-normal text-gray ml-2">
              ({items.length} {items.length === 1 ? "item" : "items"})
            </span>
          </motion.h1>
          <button
            onClick={clearWishlist}
            className="text-sm text-gray hover:text-red-500 underline self-start sm:self-auto"
          >
            Clear Wishlist
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          <AnimatePresence mode="popLayout">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group bg-white"
              >
                {/* Image */}
                <div className="relative aspect-[3/4] bg-cream-dark overflow-hidden">
                  <Link href={`/products/${item.productId}`}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                    aria-label="Remove from wishlist"
                  >
                    <X className="w-4 h-4 text-gray hover:text-red-500" />
                  </button>

                  {/* Quick Add Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <button
                      onClick={() => handleMoveToCart(item)}
                      className="w-full py-3 bg-luxe-black text-white text-sm font-medium uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-gold hover:text-luxe-black transition-colors"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Move to Bag
                    </button>
                  </motion.div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <p className="text-xs text-gray uppercase tracking-wider mb-1">
                    {item.category}
                  </p>
                  <Link
                    href={`/products/${item.productId}`}
                    className="font-medium hover:text-gold transition-colors line-clamp-1 block mb-2"
                  >
                    {item.name}
                  </Link>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{formatPrice(item.price)}</span>
                    {item.originalPrice && (
                      <span className="text-sm text-gray line-through">
                        {formatPrice(item.originalPrice)}
                      </span>
                    )}
                  </div>

                  {/* Mobile Add to Cart */}
                  <button
                    onClick={() => handleMoveToCart(item)}
                    className="lg:hidden w-full mt-4 py-2 border border-luxe-black text-sm font-medium uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-luxe-black hover:text-white transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Add to Bag
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Continue Shopping */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/products"
            className="btn-secondary inline-flex items-center gap-2"
          >
            Continue Shopping
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
