"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star, Quote } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  role: string;
  image: string;
  rating: number;
  comment: string;
  index?: number;
}

export default function TestimonialCard({
  name,
  role,
  image,
  rating,
  comment,
  index = 0,
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white p-8 relative"
    >
      <Quote className="absolute top-6 right-6 w-10 h-10 text-cream-dark" />

      {/* Rating */}
      <div className="flex gap-1 mb-6">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "text-gold fill-gold" : "text-gray-light"
            }`}
          />
        ))}
      </div>

      {/* Comment */}
      <p className="text-gray-dark leading-relaxed mb-6">&ldquo;{comment}&rdquo;</p>

      {/* Author */}
      <div className="flex items-center gap-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden">
          <Image src={image} alt={name} fill className="object-cover" />
        </div>
        <div>
          <h4 className="font-semibold text-luxe-black">{name}</h4>
          <p className="text-sm text-gray">{role}</p>
        </div>
      </div>
    </motion.div>
  );
}
