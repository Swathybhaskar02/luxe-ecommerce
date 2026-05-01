"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, X, ShoppingBag, ArrowRight, Tag, Truck } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");

  const subtotal = getTotal();
  const shipping = subtotal > 150 ? 0 : 15;
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const total = subtotal + shipping - discount;

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === "luxe10") {
      setPromoApplied(true);
      setPromoError("");
    } else {
      setPromoError("Invalid promo code");
      setPromoApplied(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-cream py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-md mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <ShoppingBag className="w-20 h-20 mx-auto text-gray-light mb-6" />
              <h1 className="text-3xl font-display mb-4">Your Bag is Empty</h1>
              <p className="text-gray mb-8">
                Looks like you haven&apos;t added anything to your bag yet.
                Discover our collection of premium pieces.
              </p>
              <Link href="/products" className="btn-primary inline-flex items-center gap-2">
                Start Shopping
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-8 lg:py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl lg:text-4xl font-display mb-8"
        >
          Shopping Bag
        </motion.h1>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-light">
              {/* Header */}
              <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-4 border-b border-gray-light text-sm font-medium uppercase tracking-wider text-gray">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              {/* Items */}
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    className="p-6 border-b border-gray-light last:border-0"
                  >
                    <div className="grid md:grid-cols-12 gap-4 items-center">
                      {/* Product Info */}
                      <div className="md:col-span-6 flex gap-4">
                        <Link
                          href={`/products/${item.productId}`}
                          className="relative w-24 h-28 flex-shrink-0 bg-cream-dark"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </Link>
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/products/${item.productId}`}
                            className="font-medium hover:text-gold transition-colors block truncate"
                          >
                            {item.name}
                          </Link>
                          {(item.size || item.color) && (
                            <p className="text-sm text-gray mt-1">
                              {item.size && `Size: ${item.size}`}
                              {item.size && item.color && " / "}
                              {item.color && `Color: ${item.color}`}
                            </p>
                          )}
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-sm text-gray hover:text-red-500 mt-2 flex items-center gap-1 md:hidden"
                          >
                            <X className="w-4 h-4" />
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* Quantity */}
                      <div className="md:col-span-2 flex justify-center">
                        <div className="flex items-center border border-gray-light">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-cream-dark transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 font-medium min-w-[40px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-cream-dark transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="md:col-span-2 text-center">
                        <span className="md:hidden text-sm text-gray mr-2">Price:</span>
                        <span className="font-medium">{formatPrice(item.price)}</span>
                        {item.originalPrice && (
                          <span className="text-sm text-gray line-through ml-2">
                            {formatPrice(item.originalPrice)}
                          </span>
                        )}
                      </div>

                      {/* Total */}
                      <div className="md:col-span-2 flex items-center justify-end gap-4">
                        <div>
                          <span className="md:hidden text-sm text-gray mr-2">Total:</span>
                          <span className="font-semibold">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="hidden md:block p-1 text-gray hover:text-red-500 transition-colors"
                          aria-label="Remove item"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
              <Link
                href="/products"
                className="btn-secondary inline-flex items-center justify-center gap-2"
              >
                Continue Shopping
              </Link>
              <button
                onClick={clearCart}
                className="text-sm text-gray hover:text-red-500 underline"
              >
                Clear Bag
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white border border-gray-light p-6 sticky top-32"
            >
              <h2 className="text-xl font-display font-semibold mb-6">
                Order Summary
              </h2>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="text-sm font-medium block mb-2">
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => {
                        setPromoCode(e.target.value);
                        setPromoError("");
                      }}
                      placeholder="Enter code"
                      className="w-full pl-10 pr-4 py-3 border border-gray-light focus:border-luxe-black focus:outline-none text-sm"
                    />
                  </div>
                  <button
                    onClick={handleApplyPromo}
                    className="px-4 py-3 bg-luxe-black text-white text-sm font-medium hover:bg-gold hover:text-luxe-black transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoError && (
                  <p className="text-sm text-red-500 mt-1">{promoError}</p>
                )}
                {promoApplied && (
                  <p className="text-sm text-green-600 mt-1">
                    Code applied! 10% discount
                  </p>
                )}
                <p className="text-xs text-gray mt-2">Try: LUXE10</p>
              </div>

              {/* Summary */}
              <div className="space-y-3 text-sm border-t border-gray-light pt-6">
                <div className="flex justify-between">
                  <span className="text-gray">Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount (10%)</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? "Free" : formatPrice(shipping)}
                  </span>
                </div>
                {shipping === 0 && (
                  <div className="flex items-center gap-2 text-green-600 text-xs">
                    <Truck className="w-4 h-4" />
                    Free shipping on orders over $150
                  </div>
                )}
              </div>

              <div className="flex justify-between text-lg font-semibold mt-6 pt-6 border-t border-gray-light">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>

              <Link
                href="/checkout"
                className="btn-primary w-full text-center flex items-center justify-center gap-2 mt-6"
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </Link>

              <p className="text-xs text-gray text-center mt-4">
                Taxes calculated at checkout
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
