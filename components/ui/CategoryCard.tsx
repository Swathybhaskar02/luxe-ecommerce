"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface CategoryCardProps {
  name: string;
  image: string;
  href: string;
  count?: number;
  index?: number;
}

export default function CategoryCard({
  name,
  image,
  href,
  count,
  index = 0,
}: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link href={href} className="block relative overflow-hidden">
        <div className="aspect-[4/5] relative">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Creeper gold border animation */}
          <div className="absolute inset-2 pointer-events-none">
            {/* Top border - creeps from left to right */}
            <span className="absolute top-0 left-0 h-[2px] w-0 bg-gradient-to-r from-gold-dark via-gold-light to-gold-dark transition-all duration-300 ease-out group-hover:w-full" />
            {/* Right border - creeps from top to bottom */}
            <span className="absolute top-0 right-0 w-[2px] h-0 bg-gradient-to-b from-gold-dark via-gold-light to-gold-dark transition-all duration-300 ease-out delay-150 group-hover:h-full" />
            {/* Bottom border - creeps from right to left */}
            <span className="absolute bottom-0 right-0 h-[2px] w-0 bg-gradient-to-l from-gold-dark via-gold-light to-gold-dark transition-all duration-300 ease-out delay-300 group-hover:w-full" />
            {/* Left border - creeps from bottom to top */}
            <span className="absolute bottom-0 left-0 w-[2px] h-0 bg-gradient-to-t from-gold-dark via-gold-light to-gold-dark transition-all duration-300 ease-out delay-[450ms] group-hover:h-full" />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-2xl font-display text-white mb-1">{name}</h3>
              {count !== undefined && (
                <p className="text-sm text-white/70">{count} Products</p>
              )}
            </div>
            <motion.div
              whileHover={{ x: 5 }}
              className="w-10 h-10 bg-gold rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ArrowRight className="w-5 h-5 text-luxe-black" />
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
