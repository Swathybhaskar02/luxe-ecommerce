"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Search, X, ArrowRight } from "lucide-react";
import { products } from "@/lib/data/products";
import { formatPrice, debounce } from "@/lib/utils";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof products>([]);
  const [isSearching, setIsSearching] = useState(false);

  const searchProducts = useCallback(
    debounce((searchQuery: string) => {
      if (searchQuery.trim() === "") {
        setResults([]);
        setIsSearching(false);
        return;
      }

      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setResults(filtered.slice(0, 6));
      setIsSearching(false);
    }, 300),
    []
  );

  useEffect(() => {
    if (query) {
      setIsSearching(true);
      searchProducts(query);
    } else {
      setResults([]);
    }
  }, [query, searchProducts]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
      setResults([]);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const popularSearches = ["Jackets", "Shoes", "Watches", "Shirts"];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-luxe-black/95 z-50 flex items-start justify-center pt-20 md:pt-32"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-3xl mx-4"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-white hover:text-gold transition-colors"
              aria-label="Close search"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 text-gray" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for products..."
                autoFocus
                className="w-full bg-transparent border-b-2 border-gray text-white text-2xl md:text-3xl pl-10 pb-4 focus:border-gold focus:outline-none transition-colors placeholder-gray"
              />
            </div>

            {/* Popular Searches */}
            {!query && (
              <div className="mt-8">
                <p className="text-sm text-gray uppercase tracking-wider mb-4">
                  Popular Searches
                </p>
                <div className="flex flex-wrap gap-3">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-4 py-2 border border-gray text-white hover:border-gold hover:text-gold transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Search Results */}
            {query && (
              <div className="mt-8">
                {isSearching ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : results.length > 0 ? (
                  <>
                    <p className="text-sm text-gray uppercase tracking-wider mb-4">
                      {results.length} Results
                    </p>
                    <ul className="space-y-4">
                      {results.map((product) => (
                        <motion.li
                          key={product.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                        >
                          <Link
                            href={`/products/${product.id}`}
                            onClick={onClose}
                            className="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 transition-colors group"
                          >
                            <div className="relative w-16 h-20 flex-shrink-0 bg-cream-dark">
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-white font-medium truncate">
                                {product.name}
                              </h4>
                              <p className="text-sm text-gray">{product.category}</p>
                              <p className="text-gold font-semibold mt-1">
                                {formatPrice(product.price)}
                              </p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray group-hover:text-gold transition-colors" />
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                    <Link
                      href={`/products?search=${encodeURIComponent(query)}`}
                      onClick={onClose}
                      className="flex items-center justify-center gap-2 mt-6 py-3 text-gold hover:text-gold-light transition-colors"
                    >
                      View all results
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray text-lg">
                      No products found for &quot;{query}&quot;
                    </p>
                    <p className="text-sm text-gray mt-2">
                      Try a different search term
                    </p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
