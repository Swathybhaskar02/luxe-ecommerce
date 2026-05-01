"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, Heart, Globe, Leaf } from "lucide-react";

const values = [
  {
    icon: Award,
    title: "Exceptional Quality",
    description:
      "Every piece in our collection is crafted from the finest materials by skilled artisans who share our passion for excellence.",
  },
  {
    icon: Heart,
    title: "Timeless Design",
    description:
      "We believe in creating pieces that transcend trends, becoming cherished staples in your wardrobe for years to come.",
  },
  {
    icon: Globe,
    title: "Global Craftsmanship",
    description:
      "We partner with master craftsmen from Italy, France, and beyond, bringing world-class expertise to every creation.",
  },
  {
    icon: Leaf,
    title: "Sustainable Luxury",
    description:
      "Our commitment to sustainability means ethical sourcing, responsible production, and minimal environmental impact.",
  },
];

const milestones = [
  { year: "2010", event: "LUXE founded in New York City" },
  { year: "2013", event: "Opened flagship store on Fifth Avenue" },
  { year: "2016", event: "Launched sustainable fashion initiative" },
  { year: "2019", event: "Expanded to 50+ countries worldwide" },
  { year: "2022", event: "Introduced carbon-neutral shipping" },
  { year: "2024", event: "Celebrated 1 million happy customers" },
];

const team = [
  {
    name: "Isabella Romano",
    role: "Founder & Creative Director",
    image: "/images/testimonial-1.jpg",
  },
  {
    name: "Alexander Chen",
    role: "Head of Design",
    image: "/images/testimonial-1.jpg",
  },
  {
    name: "Sofia Laurent",
    role: "Director of Sustainability",
    image: "/images/testimonial-1.jpg",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] bg-luxe-black overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/banners/banner-2.png')" }}
        >
          <div className="absolute inset-0 bg-luxe-black/60" />
        </div>

        <div className="relative h-full container mx-auto px-4 lg:px-8 flex items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold text-sm uppercase tracking-[0.3em] mb-4 block">
              Our Story
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display text-white mb-6">
              The Art of Luxury
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Since 2010, LUXE has been redefining premium fashion with an
              unwavering commitment to quality, craftsmanship, and timeless elegance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-gold text-sm uppercase tracking-[0.2em] mb-4 block">
                Who We Are
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display mb-6">
                A Legacy of Excellence
              </h2>
              <div className="space-y-4 text-gray-dark">
                <p>
                  LUXE was born from a simple belief: that exceptional quality and
                  timeless design should be accessible to those who appreciate the
                  finer things in life. Founded in New York City by Isabella Romano,
                  our journey began with a small atelier and a vision to create
                  pieces that transcend fleeting trends.
                </p>
                <p>
                  Today, LUXE has grown into a globally recognized name in premium
                  fashion, serving discerning customers in over 50 countries. Yet our
                  core values remain unchanged—every piece we create reflects our
                  dedication to craftsmanship, quality materials, and designs that
                  stand the test of time.
                </p>
                <p>
                  From hand-stitched leather goods crafted in Italian workshops to
                  precision timepieces assembled by Swiss masters, we partner with
                  the world's finest artisans to bring you collections that embody
                  true luxury.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[4/5] relative">
                <Image
                  src="/images/banners/banner-1.png"
                  alt="LUXE craftsmanship"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-gold p-8 hidden md:block">
                <p className="text-4xl font-display text-luxe-black">14+</p>
                <p className="text-sm text-luxe-black/80 uppercase tracking-wider">
                  Years of Excellence
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28 bg-luxe-black text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-gold text-sm uppercase tracking-[0.2em] mb-4 block">
              Our Values
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display">
              What We Stand For
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 border border-gold rounded-full flex items-center justify-center">
                  <value.icon className="w-7 h-7 text-gold" />
                </div>
                <h3 className="text-xl font-display mb-3">{value.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-gold text-sm uppercase tracking-[0.2em] mb-4 block">
              Our Journey
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display">
              Milestones
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-8 mb-8 last:mb-0"
              >
                <div className="w-20 flex-shrink-0 text-right">
                  <span className="text-2xl font-display text-gold">
                    {milestone.year}
                  </span>
                </div>
                <div className="relative pb-8 border-l-2 border-gray-light pl-8 flex-1">
                  <div className="absolute left-[-9px] top-2 w-4 h-4 bg-gold rounded-full" />
                  <p className="text-gray-dark">{milestone.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 lg:py-28 bg-cream-dark">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-gold text-sm uppercase tracking-[0.2em] mb-4 block">
              Leadership
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display mb-4">
              Meet Our Team
            </h2>
            <p className="text-gray max-w-xl mx-auto">
              The visionaries behind LUXE, united by a passion for exceptional
              design and unwavering quality.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-display mb-1">{member.name}</h3>
                <p className="text-gold text-sm">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-luxe-black">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-white mb-6">
              Experience the LUXE Difference
            </h2>
            <p className="text-lg text-white/70 mb-10">
              Discover why over a million customers trust LUXE for their premium
              fashion needs. Explore our latest collection today.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-3 px-10 py-5 bg-gold text-luxe-black font-medium uppercase tracking-wider hover:bg-gold-light transition-colors"
            >
              Shop Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
