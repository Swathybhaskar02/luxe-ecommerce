"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Truck, Shield, RotateCcw, Headphones } from "lucide-react";
import { useRef } from "react";
import HeroBanner from "@/components/ui/HeroBanner";
import CategoryCard from "@/components/ui/CategoryCard";
import ProductCard from "@/components/products/ProductCard";
import TestimonialCard from "@/components/ui/TestimonialCard";
import { getNewArrivals, getBestSellers, categories } from "@/lib/data/products";

const featuredCategories = [
  {
    name: "Jackets",
    image: "/images/products/jacket-1.jpg",
    href: "/products?category=jackets",
    count: 24,
  },
  {
    name: "Shoes",
    image: "/images/products/shoe-1.jpg",
    href: "/products?category=shoes",
    count: 32,
  },
  {
    name: "Watches",
    image: "/images/products/watch-1.jpg",
    href: "/products?category=watches",
    count: 15,
  },
  {
    name: "Jewelry",
    image: "/images/products/jewellery-1.jpg",
    href: "/products?category=jewelry",
    count: 21,
  },
];

const testimonials = [
  {
    name: "Alexandra Chen",
    role: "Fashion Designer",
    image: "/images/testimonial-1.jpg",
    rating: 5,
    comment:
      "The quality and attention to detail in every piece from LUXE is exceptional. My go-to destination for premium fashion that makes a statement.",
  },
  {
    name: "Marcus Williams",
    role: "Creative Director",
    image: "/images/testimonial-1.jpg",
    rating: 5,
    comment:
      "Impeccable service and stunning products. The leather jacket I purchased has become a staple in my wardrobe. Truly worth the investment.",
  },
  {
    name: "Sophie Laurent",
    role: "Style Consultant",
    image: "/images/testimonial-1.jpg",
    rating: 5,
    comment:
      "LUXE understands luxury. From the moment you browse their collection to unboxing your purchase, every detail screams sophistication.",
  },
];

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over $150",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "100% secure checkout",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "30-day return policy",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Dedicated assistance",
  },
];

function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section ref={sectionRef} className="relative py-32 lg:py-40 overflow-hidden">
      {/* Desktop background with Parallax */}
      <motion.div
        className="absolute inset-0 hidden sm:block"
        style={{ y: backgroundY }}
      >
        <div
          className="absolute inset-[-20%] bg-cover bg-center"
          style={{ backgroundImage: "url('/images/banners/banner-2.png')" }}
        />
        <div className="absolute inset-0 bg-luxe-black/60" />
      </motion.div>
      
      {/* Mobile portrait background with Parallax */}
      <motion.div
        className="absolute inset-0 block sm:hidden"
        style={{ y: backgroundY }}
      >
        <div
          className="absolute inset-[-20%] bg-cover bg-center"
          style={{ backgroundImage: "url('/images/banners/section-mobile.png')" }}
        />
        <div className="absolute inset-0 bg-luxe-black/60" />
      </motion.div>

      <div className="relative container mx-auto px-4 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <span className="text-gold text-sm uppercase tracking-[0.3em] mb-6 block">
            Our Philosophy
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display text-[#FFF8E7] mb-6 sm:mb-8 leading-tight">
            Crafted for Those Who Appreciate the Finer Things
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#E8DCC8] mb-8 sm:mb-10 max-w-2xl mx-auto">
            Every piece in our collection tells a story of exceptional
            craftsmanship, premium materials, and timeless design. We believe
            in quality over quantity, creating pieces that become treasured
            parts of your wardrobe.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-3 px-8 py-4 border border-gold text-gold font-medium uppercase tracking-wider hover:bg-gold hover:text-luxe-black transition-colors rounded-lg"
          >
            Our Story
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const newArrivals = getNewArrivals();
  const bestSellers = getBestSellers();

  return (
    <>
      {/* Hero Banner */}
      <HeroBanner />

      {/* Features Bar */}
      <section className="bg-white border-b border-gray-light">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-light">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="py-8 px-4 text-center cursor-pointer group"
              >
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                >
                  <feature.icon className="w-8 h-8 mx-auto mb-3 text-gold group-hover:text-gold-dark transition-colors" />
                </motion.div>
                <h4 className="font-semibold text-sm uppercase tracking-wider mb-1">
                  {feature.title}
                </h4>
                <p className="text-sm text-gray">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 lg:py-28 overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-sm text-gold uppercase tracking-[0.2em] mb-4 block"
            >
              Explore
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-display mb-4"
            >
              Shop by Category
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-gray max-w-xl mx-auto"
            >
              Discover our carefully curated collections, each piece selected
              for its exceptional quality and timeless design.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            {featuredCategories.map((category, index) => (
              <CategoryCard key={category.name} {...category} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-sm text-gold uppercase tracking-[0.2em] mb-4 block">
                Just In
              </span>
              <h2 className="text-4xl md:text-5xl font-display">New Arrivals</h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Link
                href="/products?filter=new"
                className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider hover:text-gold transition-colors group mt-4 md:mt-0"
              >
                View All
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {newArrivals.slice(0, 4).map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story Banner with Parallax */}
      <PhilosophySection />

      {/* Best Sellers */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-sm text-gold uppercase tracking-[0.2em] mb-4 block">
                Most Loved
              </span>
              <h2 className="text-4xl md:text-5xl font-display">Best Sellers</h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Link
                href="/products?filter=bestsellers"
                className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider hover:text-gold transition-colors group mt-4 md:mt-0"
              >
                View All
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {bestSellers.slice(0, 4).map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-28 bg-cream-dark">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-sm text-gold uppercase tracking-[0.2em] mb-4 block">
              Testimonials
            </span>
            <h2 className="text-4xl md:text-5xl font-display mb-4">
              What Our Clients Say
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={testimonial.name} {...testimonial} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner - Combined with Newsletter */}
      <section className="py-12 lg:py-16 bg-luxe-black overflow-hidden relative">
        
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display text-white mb-3">
              Join the LUXE Experience
            </h2>
            <p className="text-sm sm:text-base text-white/60 mb-6">
              Subscribe for exclusive offers and new collection updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/50 rounded-full focus:outline-none focus:border-gold text-sm"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-gold-dark via-gold-light to-gold-dark text-luxe-black font-medium uppercase tracking-wider text-xs sm:text-sm hover:brightness-110 transition-all rounded-full">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
