"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X, Star } from "lucide-react";
import { categories } from "@/lib/data/products";

interface Filters {
  category: string;
  minPrice: number;
  maxPrice: number;
  sizes: string[];
  colors: string[];
  rating: number;
}

interface FilterSidebarProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  onClose?: () => void;
  isMobile?: boolean;
}

const allSizes = ["XS", "S", "M", "L", "XL", "XXL", "7", "8", "9", "10", "11", "12"];
const allColors = [
  { name: "Black", hex: "#0a0a0a" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Brown", hex: "#8B4513" },
  { name: "Navy", hex: "#1a1a3a" },
  { name: "Gray", hex: "#808080" },
  { name: "Gold", hex: "#FFD700" },
  { name: "Silver", hex: "#C0C0C0" },
];

const priceRanges = [
  { label: "Under $100", min: 0, max: 100 },
  { label: "$100 - $300", min: 100, max: 300 },
  { label: "$300 - $500", min: 300, max: 500 },
  { label: "$500 - $1000", min: 500, max: 1000 },
  { label: "Over $1000", min: 1000, max: 10000 },
];

export default function FilterSidebar({
  filters,
  onFilterChange,
  onClose,
  isMobile = false,
}: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "category",
    "price",
    "size",
    "color",
    "rating",
  ]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const handleCategoryChange = (category: string) => {
    onFilterChange({
      ...filters,
      category: filters.category === category ? "" : category,
    });
  };

  const handlePriceChange = (min: number, max: number) => {
    const isSameRange = filters.minPrice === min && filters.maxPrice === max;
    onFilterChange({
      ...filters,
      minPrice: isSameRange ? 0 : min,
      maxPrice: isSameRange ? 10000 : max,
    });
  };

  const handleSizeToggle = (size: string) => {
    const newSizes = filters.sizes.includes(size)
      ? filters.sizes.filter((s) => s !== size)
      : [...filters.sizes, size];
    onFilterChange({ ...filters, sizes: newSizes });
  };

  const handleColorToggle = (color: string) => {
    const newColors = filters.colors.includes(color)
      ? filters.colors.filter((c) => c !== color)
      : [...filters.colors, color];
    onFilterChange({ ...filters, colors: newColors });
  };

  const handleRatingChange = (rating: number) => {
    onFilterChange({
      ...filters,
      rating: filters.rating === rating ? 0 : rating,
    });
  };

  const clearAllFilters = () => {
    onFilterChange({
      category: "",
      minPrice: 0,
      maxPrice: 10000,
      sizes: [],
      colors: [],
      rating: 0,
    });
  };

  const hasActiveFilters =
    filters.category ||
    filters.minPrice > 0 ||
    filters.maxPrice < 10000 ||
    filters.sizes.length > 0 ||
    filters.colors.length > 0 ||
    filters.rating > 0;

  const FilterSection = ({
    title,
    id,
    children,
  }: {
    title: string;
    id: string;
    children: React.ReactNode;
  }) => (
    <div className="border-b border-gray-light pb-6 mb-6">
      <button
        onClick={() => toggleSection(id)}
        className="flex items-center justify-between w-full text-left mb-4"
      >
        <h4 className="font-medium uppercase tracking-wider text-sm">{title}</h4>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            expandedSections.includes(id) ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {expandedSections.includes(id) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className={`${isMobile ? "p-6" : ""}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-display font-semibold">Filters</h3>
        <div className="flex items-center gap-4">
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-gray hover:text-luxe-black underline"
            >
              Clear All
            </button>
          )}
          {isMobile && onClose && (
            <button onClick={onClose} className="p-1">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Categories */}
      <FilterSection title="Category" id="category">
        <div className="space-y-3">
          {categories.map((category) => (
            <label
              key={category.id}
              className="flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={filters.category.toLowerCase() === category.id}
                  onChange={() => handleCategoryChange(category.id)}
                  className="w-4 h-4 border-gray-light text-gold focus:ring-gold rounded-none"
                />
                <span className="text-sm group-hover:text-gold transition-colors">
                  {category.name}
                </span>
              </div>
              <span className="text-xs text-gray">({category.count})</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Price Range" id="price">
        <div className="space-y-3">
          {priceRanges.map((range) => (
            <label
              key={range.label}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={
                  filters.minPrice === range.min && filters.maxPrice === range.max
                }
                onChange={() => handlePriceChange(range.min, range.max)}
                className="w-4 h-4 border-gray-light text-gold focus:ring-gold rounded-none"
              />
              <span className="text-sm group-hover:text-gold transition-colors">
                {range.label}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Sizes */}
      <FilterSection title="Size" id="size">
        <div className="flex flex-wrap gap-2">
          {allSizes.map((size) => (
            <button
              key={size}
              onClick={() => handleSizeToggle(size)}
              className={`px-3 py-2 text-sm border transition-colors ${
                filters.sizes.includes(size)
                  ? "border-luxe-black bg-luxe-black text-white"
                  : "border-gray-light hover:border-luxe-black"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Colors */}
      <FilterSection title="Color" id="color">
        <div className="flex flex-wrap gap-3">
          {allColors.map((color) => (
            <button
              key={color.name}
              onClick={() => handleColorToggle(color.name)}
              className={`w-8 h-8 rounded-full border-2 transition-all ${
                filters.colors.includes(color.name)
                  ? "border-gold scale-110"
                  : "border-transparent hover:scale-110"
              }`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            >
              {filters.colors.includes(color.name) && (
                <span className="flex items-center justify-center h-full">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      color.name === "White" ? "bg-luxe-black" : "bg-white"
                    }`}
                  />
                </span>
              )}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Rating */}
      <FilterSection title="Rating" id="rating">
        <div className="space-y-3">
          {[4, 3, 2, 1].map((rating) => (
            <label
              key={rating}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={filters.rating === rating}
                onChange={() => handleRatingChange(rating)}
                className="w-4 h-4 border-gray-light text-gold focus:ring-gold rounded-none"
              />
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < rating ? "text-gold fill-gold" : "text-gray-light"
                    }`}
                  />
                ))}
                <span className="text-sm text-gray ml-1">& Up</span>
              </div>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Apply Button (Mobile) */}
      {isMobile && (
        <button
          onClick={onClose}
          className="w-full btn-primary mt-4"
        >
          Apply Filters
        </button>
      )}
    </div>
  );
}
