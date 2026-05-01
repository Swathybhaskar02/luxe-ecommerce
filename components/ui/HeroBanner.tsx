"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

export default function HeroBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={sectionRef} className="relative w-full min-h-[100svh] md:min-h-[600px] md:h-[70vh] lg:h-[80vh] xl:h-[85vh] bg-[#d5d0c8] overflow-hidden">
      {/* Background Image - Tablet & Desktop with Parallax */}
      <motion.div 
        className="absolute inset-0 hidden md:block"
        style={{ y: backgroundY }}
        initial={{ scale: 1.05 }}
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
          quality={90}
        />
      </motion.div>

      {/* Background Image - Mobile (Portrait) with Parallax */}
      <motion.div 
        className="absolute inset-0 block md:hidden"
        style={{ y: backgroundY }}
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

      {/* Subtle gradient overlay for mobile only */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent md:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      />

      {/* Content Overlay with Parallax */}
      <motion.div className="absolute inset-0" style={{ y: textY, opacity }}>
        <div className="h-full container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span className="inline-block text-white/80 md:text-[#5A5A5A] text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] mb-2 md:mb-3 lg:mb-4">
                New Collection 2024
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display text-white md:text-[#1A1A1A] leading-[1.1] mb-2 sm:mb-3 md:mb-4"
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
                className="inline-block bg-gradient-to-r from-gold-dark via-gold-light to-gold-dark bg-[length:200%_100%] animate-shimmer bg-clip-text text-transparent"
              >
                Style
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="text-xs sm:text-sm md:text-base lg:text-lg text-white/80 md:text-[#4A4A4A] mb-4 sm:mb-5 md:mb-6 max-w-xs sm:max-w-sm md:max-w-md mx-auto px-2"
            >
              Discover our curated collection of premium fashion pieces, crafted
              for those who appreciate timeless elegance.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 items-center justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-gold-dark via-gold-light to-gold-dark text-luxe-black font-medium uppercase tracking-wider text-[10px] sm:text-xs md:text-sm hover:brightness-110 transition-all duration-300 group rounded-full shadow-lg hover:shadow-gold/30"
                >
                  Shop Collection
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/products?filter=new"
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 border-2 border-white md:border-luxe-black text-white md:text-luxe-black font-medium uppercase tracking-wider text-[10px] sm:text-xs md:text-sm hover:bg-white hover:text-luxe-black md:hover:bg-luxe-black md:hover:text-white transition-all duration-300 rounded-full"
                >
                  New Arrivals
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator - mobile only */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 md:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/30 rounded-full flex justify-center pt-1.5 sm:pt-2"
        >
          <motion.div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-gold rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
