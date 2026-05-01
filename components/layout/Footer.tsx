"use client";

import Link from "next/link";
import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const footerLinks = {
  shop: [
    { name: "New Arrivals", href: "/products?filter=new" },
    { name: "Best Sellers", href: "/products?filter=bestsellers" },
    { name: "Sale", href: "/products?filter=sale" },
    { name: "All Products", href: "/products" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Press", href: "/press" },
    { name: "Sustainability", href: "/sustainability" },
  ],
  support: [
    { name: "Contact Us", href: "/contact" },
    { name: "FAQs", href: "/faqs" },
    { name: "Shipping & Returns", href: "/shipping" },
    { name: "Size Guide", href: "/size-guide" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
  ],
};

const socialLinks = [
  { name: "Facebook", href: "#", label: "FB" },
  { name: "Instagram", href: "#", label: "IG" },
  { name: "Twitter", href: "#", label: "X" },
  { name: "YouTube", href: "#", label: "YT" },
];

export default function Footer() {
  return (
    <footer className="bg-luxe-black text-luxe-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <h2 className="text-3xl font-display font-bold tracking-wider">
                LUXE
              </h2>
            </Link>
            <p className="text-gray mb-6 max-w-sm">
              Elevate your style with premium fashion pieces crafted for the
              modern connoisseur. Quality meets elegance in every detail.
            </p>
            <div className="space-y-3 text-sm text-gray">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-gold" />
                <span>123 Fifth Avenue, New York, NY 10001</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold" />
                <span>+1 (800) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold" />
                <span>hello@luxe.com</span>
              </div>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider mb-6">
              Shop
            </h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray hover:text-gold transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider mb-6">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray hover:text-gold transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider mb-6">
              Support
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray hover:text-gold transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider mb-6">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray hover:text-gold transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-dark">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray">
              &copy; {new Date().getFullYear()} LUXE. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-8 h-8 border border-gray-dark rounded-full flex items-center justify-center text-xs font-medium text-gray hover:text-gold hover:border-gold transition-colors"
                  aria-label={social.name}
                >
                  {social.label}
                </a>
              ))}
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-2 text-sm text-gray">
              <span>We accept:</span>
              <div className="flex gap-2">
                <span className="px-2 py-1 border border-gray-dark rounded text-xs">
                  Visa
                </span>
                <span className="px-2 py-1 border border-gray-dark rounded text-xs">
                  MC
                </span>
                <span className="px-2 py-1 border border-gray-dark rounded text-xs">
                  Amex
                </span>
                <span className="px-2 py-1 border border-gray-dark rounded text-xs">
                  PayPal
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
