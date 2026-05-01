"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function HeroBanner() {
  return (
    <section className="relative w-full h-[70vh] min-h-[500px] max-h-[800px] bg-luxe-black overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/banners/banner-1.png"
          alt="LUXE Hero"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent">
        <div className="h-full container mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="w-full max-w-xl lg:max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="inline-block text-white text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-2 sm:mb-4">
                New Collection 2024
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display text-luxe-black leading-[1.1] mb-2 sm:mb-4"
            >
              Elevate Your
              <br />
              <span className="text-gold drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">Style</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-sm sm:text-base md:text-lg text-gray-dark mb-4 sm:mb-6 max-w-md"
            >
              Discover our curated collection of premium fashion pieces, crafted
              for those who appreciate timeless elegance.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-2 sm:gap-4"
            >
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 lg:px-8 py-3 sm:py-3 lg:py-4 bg-gold text-luxe-black font-medium uppercase tracking-wider text-xs sm:text-sm hover:bg-gold-light transition-colors group rounded-full"
              >
                Shop Collection
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/products?filter=new"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 lg:px-8 py-3 sm:py-3 lg:py-4 border-2 border-luxe-black text-luxe-black font-medium uppercase tracking-wider text-xs sm:text-sm hover:bg-luxe-black hover:text-white transition-colors rounded-full"
              >
                New Arrivals
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
