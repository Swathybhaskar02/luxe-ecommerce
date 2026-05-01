"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function HeroBanner() {
  return (
    <section className="relative w-full h-[100vh] sm:h-[70vh] sm:min-h-[500px] sm:max-h-[800px] bg-cream overflow-hidden">
      {/* Background Image - Desktop */}
      <motion.div 
        className="absolute inset-0 hidden sm:block"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <Image
          src="/images/banners/banner-1.png"
          alt="LUXE Hero"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          quality={85}
        />
      </motion.div>

      {/* Background Image - Mobile (Portrait) */}
      <motion.div 
        className="absolute inset-0 block sm:hidden"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <Image
          src="/images/banners/banner-mobile.png"
          alt="LUXE Hero"
          fill
          priority
          className="object-cover object-top"
          sizes="100vw"
          quality={80}
        />
      </motion.div>

      {/* Animated gradient overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-black/50 via-black/20 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      />

      {/* Floating particles effect - hidden on mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gold/30 rounded-full"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0">
        <div className="h-full container mx-auto px-4 sm:px-6 lg:px-8 flex items-center sm:items-center justify-center sm:justify-start">
          <div className="w-full max-w-xl lg:max-w-2xl text-center sm:text-left">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span className="inline-block text-white/80 sm:text-[#7A7A7A] text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-2 sm:mb-4">
                New Collection 2024
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-display text-white sm:text-[#1A1A1A] leading-[1.1] mb-3 sm:mb-4"
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="inline-block"
              >
                Elevate Your
              </motion.span>
              <br />
              <motion.span 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8, type: "spring", stiffness: 100 }}
                className="inline-block bg-gradient-to-r from-[#8B6914] via-[#C9A050] to-[#8B6914] bg-[length:200%_100%] animate-shimmer bg-clip-text text-transparent"
              >
                Style
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="text-sm sm:text-base md:text-lg text-white/80 sm:text-[#4A4A4A] mb-6 sm:mb-6 max-w-md mx-auto sm:mx-0"
            >
              Discover our curated collection of premium fashion pieces, crafted
              for those who appreciate timeless elegance.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center sm:items-start"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-6 lg:px-8 py-3 sm:py-3 lg:py-4 bg-gradient-to-r from-[#8B6914] via-[#C9A050] to-[#8B6914] text-white font-medium uppercase tracking-wider text-xs sm:text-sm hover:brightness-110 transition-all duration-300 group rounded-full shadow-lg hover:shadow-xl"
                >
                  Shop Collection
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/products?filter=new"
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-6 lg:px-8 py-3 sm:py-3 lg:py-4 border-2 border-white sm:border-luxe-black text-white sm:text-luxe-black font-medium uppercase tracking-wider text-xs sm:text-sm hover:bg-white hover:text-luxe-black sm:hover:bg-luxe-black sm:hover:text-white transition-all duration-300 rounded-full"
                >
                  New Arrivals
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 sm:border-luxe-black/30 rounded-full flex justify-center pt-2"
        >
          <motion.div className="w-1.5 h-1.5 bg-gold rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
