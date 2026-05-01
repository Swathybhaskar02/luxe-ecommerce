"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X, ChevronDown, Grid3X3, LayoutGrid } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import FilterSidebar from "@/components/products/FilterSidebar";
import { products, filterProducts } from "@/lib/data/products";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "popular", label: "Most Popular" },
];

function ProductsContent() {
  const searchParams = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [sortOpen, setSortOpen] = useState(false);
  const [gridCols, setGridCols] = useState<3 | 4>(4);
  const [filters, setFilters] = useState({
    category: "",
    minPrice: 0,
    maxPrice: 10000,
    sizes: [] as string[],
    colors: [] as string[],
    rating: 0,
  });

  useEffect(() => {
    const category = searchParams.get("category");
    const filter = searchParams.get("filter");
    const search = searchParams.get("search");

    if (category) {
      setFilters((prev) => ({ ...prev, category }));
    }
    if (filter === "new") {
      setSortBy("newest");
    } else if (filter === "bestsellers") {
      setSortBy("popular");
    } else if (filter === "sale") {
      setFilters((prev) => ({ ...prev, minPrice: 0, maxPrice: 500 }));
    }
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    const search = searchParams.get("search") || "";
    return filterProducts({ ...filters, search }, sortBy);
  }, [filters, sortBy, searchParams]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.category) count++;
    if (filters.minPrice > 0 || filters.maxPrice < 10000) count++;
    if (filters.sizes.length > 0) count++;
    if (filters.colors.length > 0) count++;
    if (filters.rating > 0) count++;
    return count;
  }, [filters]);

  return (
    <div className="min-h-screen bg-cream">
      {/* Page Header */}
      <div className="bg-luxe-black text-white py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display mb-4"
          >
            {filters.category
              ? filters.category.charAt(0).toUpperCase() + filters.category.slice(1)
              : "All Products"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/70 max-w-xl mx-auto"
          >
            Discover our curated collection of premium fashion pieces
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-light">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-light hover:border-luxe-black transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="text-sm font-medium">Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 bg-gold text-luxe-black text-xs font-bold rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Results Count */}
          <p className="hidden lg:block text-sm text-gray">
            Showing{" "}
            <span className="font-medium text-luxe-black">
              {filteredProducts.length}
            </span>{" "}
            products
          </p>

          <div className="flex items-center gap-4">
            {/* Grid Toggle */}
            <div className="hidden lg:flex items-center gap-1 border border-gray-light">
              <button
                onClick={() => setGridCols(3)}
                className={`p-2 ${
                  gridCols === 3 ? "bg-luxe-black text-white" : "hover:bg-cream-dark"
                }`}
                aria-label="3 columns"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridCols(4)}
                className={`p-2 ${
                  gridCols === 4 ? "bg-luxe-black text-white" : "hover:bg-cream-dark"
                }`}
                aria-label="4 columns"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-light hover:border-luxe-black transition-colors min-w-[180px]"
              >
                <span className="text-sm">
                  {sortOptions.find((o) => o.value === sortBy)?.label}
                </span>
                <ChevronDown
                  className={`w-4 h-4 ml-auto transition-transform ${
                    sortOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {sortOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 top-full mt-2 w-full bg-white border border-gray-light shadow-lg z-20"
                  >
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value);
                          setSortOpen(false);
                        }}
                        className={`w-full px-4 py-3 text-left text-sm hover:bg-cream-dark transition-colors ${
                          sortBy === option.value ? "bg-cream-dark font-medium" : ""
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-32">
              <FilterSidebar filters={filters} onFilterChange={setFilters} />
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div
                className={`grid grid-cols-2 gap-4 lg:gap-6 ${
                  gridCols === 3
                    ? "lg:grid-cols-3"
                    : "md:grid-cols-3 lg:grid-cols-4"
                }`}
              >
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <h3 className="text-2xl font-display mb-4">No products found</h3>
                <p className="text-gray mb-6">
                  Try adjusting your filters or search terms
                </p>
                <button
                  onClick={() =>
                    setFilters({
                      category: "",
                      minPrice: 0,
                      maxPrice: 10000,
                      sizes: [],
                      colors: [],
                      rating: 0,
                    })
                  }
                  className="btn-primary"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              onClick={() => setMobileFiltersOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 w-full max-w-sm bg-white z-50 lg:hidden overflow-y-auto"
            >
              <FilterSidebar
                filters={filters}
                onFilterChange={setFilters}
                onClose={() => setMobileFiltersOpen(false)}
                isMobile
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
    </div>}>
      <ProductsContent />
    </Suspense>
  );
}
