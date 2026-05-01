"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ChevronLeft,
  CreditCard,
  Truck,
  ShoppingBag,
  Lock,
  AlertCircle,
} from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { useAuthStore } from "@/stores/auth-store";
import { formatPrice } from "@/lib/utils";

type Step = "cart" | "shipping" | "payment" | "confirmation";

const steps: { id: Step; label: string; icon: React.ElementType }[] = [
  { id: "cart", label: "Review", icon: ShoppingBag },
  { id: "shipping", label: "Shipping", icon: Truck },
  { id: "payment", label: "Payment", icon: CreditCard },
  { id: "confirmation", label: "Confirm", icon: Check },
];

interface ShippingData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface PaymentData {
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvv: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCartStore();
  const { isAuthenticated, user } = useAuthStore();

  const [currentStep, setCurrentStep] = useState<Step>("cart");
  const [orderNumber, setOrderNumber] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [shippingData, setShippingData] = useState<ShippingData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });

  const [paymentData, setPaymentData] = useState<PaymentData>({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">(
    "standard"
  );

  useEffect(() => {
    if (isAuthenticated && user) {
      setShippingData((prev) => ({
        ...prev,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      }));
    }
  }, [isAuthenticated, user]);

  const subtotal = getTotal();
  const shipping = shippingMethod === "express" ? 25 : subtotal > 150 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const stepIndex = steps.findIndex((s) => s.id === currentStep);

  const validateShipping = () => {
    const newErrors: Record<string, string> = {};

    if (!shippingData.firstName) newErrors.firstName = "First name is required";
    if (!shippingData.lastName) newErrors.lastName = "Last name is required";
    if (!shippingData.email) newErrors.email = "Email is required";
    if (!shippingData.address) newErrors.address = "Address is required";
    if (!shippingData.city) newErrors.city = "City is required";
    if (!shippingData.state) newErrors.state = "State is required";
    if (!shippingData.zipCode) newErrors.zipCode = "ZIP code is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePayment = () => {
    const newErrors: Record<string, string> = {};

    if (!paymentData.cardNumber || paymentData.cardNumber.replace(/\s/g, "").length !== 16) {
      newErrors.cardNumber = "Valid card number is required";
    }
    if (!paymentData.cardName) newErrors.cardName = "Name on card is required";
    if (!paymentData.expiry || !/^\d{2}\/\d{2}$/.test(paymentData.expiry)) {
      newErrors.expiry = "Valid expiry date is required (MM/YY)";
    }
    if (!paymentData.cvv || paymentData.cvv.length < 3) {
      newErrors.cvv = "Valid CVV is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === "cart") {
      setCurrentStep("shipping");
    } else if (currentStep === "shipping") {
      if (validateShipping()) {
        setCurrentStep("payment");
      }
    } else if (currentStep === "payment") {
      if (validatePayment()) {
        const orderNum = `LUXE-${Date.now().toString(36).toUpperCase()}`;
        setOrderNumber(orderNum);
        setCurrentStep("confirmation");
        clearCart();
      }
    }
  };

  const handleBack = () => {
    if (currentStep === "shipping") setCurrentStep("cart");
    else if (currentStep === "payment") setCurrentStep("shipping");
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(" ") : value;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  if (items.length === 0 && currentStep !== "confirmation") {
    return (
      <div className="min-h-screen bg-cream py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-md mx-auto text-center">
            <ShoppingBag className="w-20 h-20 mx-auto text-gray-light mb-6" />
            <h1 className="text-3xl font-display mb-4">Your Bag is Empty</h1>
            <p className="text-gray mb-8">Add items to your bag to checkout</p>
            <Link href="/products" className="btn-primary inline-block">
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-luxe-black text-white py-6">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-display font-bold tracking-wider">
              LUXE
            </Link>
            <div className="flex items-center gap-2 text-sm">
              <Lock className="w-4 h-4" />
              Secure Checkout
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b border-gray-light">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex items-center">
                  <motion.div
                    animate={{
                      backgroundColor:
                        index <= stepIndex
                          ? "#0a0a0a"
                          : "#e5e5e5",
                      color:
                        index <= stepIndex
                          ? "#ffffff"
                          : "#8a8a8a",
                    }}
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                  >
                    {index < stepIndex ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </motion.div>
                  <span
                    className={`ml-2 text-sm font-medium hidden sm:block ${
                      index <= stepIndex ? "text-luxe-black" : "text-gray"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-12 lg:w-24 h-0.5 mx-2 ${
                      index < stepIndex ? "bg-luxe-black" : "bg-gray-light"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* Step 1: Cart Review */}
              {currentStep === "cart" && (
                <motion.div
                  key="cart"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-2xl font-display mb-6">Review Your Bag</h2>
                  <div className="bg-white border border-gray-light divide-y divide-gray-light">
                    {items.map((item) => (
                      <div key={item.id} className="p-6 flex gap-4">
                        <div className="relative w-20 h-24 bg-cream-dark flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          {(item.size || item.color) && (
                            <p className="text-sm text-gray">
                              {item.size && `Size: ${item.size}`}
                              {item.size && item.color && " / "}
                              {item.color && `Color: ${item.color}`}
                            </p>
                          )}
                          <p className="text-sm text-gray">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-semibold">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Shipping */}
              {currentStep === "shipping" && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-2xl font-display mb-6">Shipping Information</h2>
                  <div className="bg-white border border-gray-light p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          First Name *
                        </label>
                        <input
                          type="text"
                          value={shippingData.firstName}
                          onChange={(e) =>
                            setShippingData({ ...shippingData, firstName: e.target.value })
                          }
                          className={`w-full px-4 py-3 border ${
                            errors.firstName ? "border-red-500" : "border-gray-light"
                          } focus:border-luxe-black focus:outline-none`}
                        />
                        {errors.firstName && (
                          <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          value={shippingData.lastName}
                          onChange={(e) =>
                            setShippingData({ ...shippingData, lastName: e.target.value })
                          }
                          className={`w-full px-4 py-3 border ${
                            errors.lastName ? "border-red-500" : "border-gray-light"
                          } focus:border-luxe-black focus:outline-none`}
                        />
                        {errors.lastName && (
                          <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          value={shippingData.email}
                          onChange={(e) =>
                            setShippingData({ ...shippingData, email: e.target.value })
                          }
                          className={`w-full px-4 py-3 border ${
                            errors.email ? "border-red-500" : "border-gray-light"
                          } focus:border-luxe-black focus:outline-none`}
                        />
                        {errors.email && (
                          <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={shippingData.phone}
                          onChange={(e) =>
                            setShippingData({ ...shippingData, phone: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-gray-light focus:border-luxe-black focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Address *
                      </label>
                      <input
                        type="text"
                        value={shippingData.address}
                        onChange={(e) =>
                          setShippingData({ ...shippingData, address: e.target.value })
                        }
                        placeholder="Street address"
                        className={`w-full px-4 py-3 border ${
                          errors.address ? "border-red-500" : "border-gray-light"
                        } focus:border-luxe-black focus:outline-none`}
                      />
                      {errors.address && (
                        <p className="text-sm text-red-500 mt-1">{errors.address}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Apartment, suite, etc.
                      </label>
                      <input
                        type="text"
                        value={shippingData.apartment}
                        onChange={(e) =>
                          setShippingData({ ...shippingData, apartment: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-light focus:border-luxe-black focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          value={shippingData.city}
                          onChange={(e) =>
                            setShippingData({ ...shippingData, city: e.target.value })
                          }
                          className={`w-full px-4 py-3 border ${
                            errors.city ? "border-red-500" : "border-gray-light"
                          } focus:border-luxe-black focus:outline-none`}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          State *
                        </label>
                        <input
                          type="text"
                          value={shippingData.state}
                          onChange={(e) =>
                            setShippingData({ ...shippingData, state: e.target.value })
                          }
                          className={`w-full px-4 py-3 border ${
                            errors.state ? "border-red-500" : "border-gray-light"
                          } focus:border-luxe-black focus:outline-none`}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          ZIP Code *
                        </label>
                        <input
                          type="text"
                          value={shippingData.zipCode}
                          onChange={(e) =>
                            setShippingData({ ...shippingData, zipCode: e.target.value })
                          }
                          className={`w-full px-4 py-3 border ${
                            errors.zipCode ? "border-red-500" : "border-gray-light"
                          } focus:border-luxe-black focus:outline-none`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Shipping Method */}
                  <h3 className="text-lg font-display mt-8 mb-4">Shipping Method</h3>
                  <div className="space-y-3">
                    <label
                      className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${
                        shippingMethod === "standard"
                          ? "border-luxe-black bg-cream-dark"
                          : "border-gray-light hover:border-gray"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          checked={shippingMethod === "standard"}
                          onChange={() => setShippingMethod("standard")}
                          className="text-gold focus:ring-gold"
                        />
                        <div>
                          <p className="font-medium">Standard Shipping</p>
                          <p className="text-sm text-gray">5-7 business days</p>
                        </div>
                      </div>
                      <p className="font-semibold">
                        {subtotal > 150 ? "Free" : "$15.00"}
                      </p>
                    </label>
                    <label
                      className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${
                        shippingMethod === "express"
                          ? "border-luxe-black bg-cream-dark"
                          : "border-gray-light hover:border-gray"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          checked={shippingMethod === "express"}
                          onChange={() => setShippingMethod("express")}
                          className="text-gold focus:ring-gold"
                        />
                        <div>
                          <p className="font-medium">Express Shipping</p>
                          <p className="text-sm text-gray">2-3 business days</p>
                        </div>
                      </div>
                      <p className="font-semibold">$25.00</p>
                    </label>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Payment */}
              {currentStep === "payment" && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-2xl font-display mb-6">Payment Details</h2>
                  <div className="bg-white border border-gray-light p-6 space-y-4">
                    <div className="flex items-center gap-2 p-4 bg-cream-dark text-sm">
                      <Lock className="w-4 h-4" />
                      Your payment information is encrypted and secure
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        value={paymentData.cardNumber}
                        onChange={(e) =>
                          setPaymentData({
                            ...paymentData,
                            cardNumber: formatCardNumber(e.target.value),
                          })
                        }
                        maxLength={19}
                        placeholder="1234 5678 9012 3456"
                        className={`w-full px-4 py-3 border ${
                          errors.cardNumber ? "border-red-500" : "border-gray-light"
                        } focus:border-luxe-black focus:outline-none`}
                      />
                      {errors.cardNumber && (
                        <p className="text-sm text-red-500 mt-1">{errors.cardNumber}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Name on Card *
                      </label>
                      <input
                        type="text"
                        value={paymentData.cardName}
                        onChange={(e) =>
                          setPaymentData({ ...paymentData, cardName: e.target.value })
                        }
                        placeholder="John Doe"
                        className={`w-full px-4 py-3 border ${
                          errors.cardName ? "border-red-500" : "border-gray-light"
                        } focus:border-luxe-black focus:outline-none`}
                      />
                      {errors.cardName && (
                        <p className="text-sm text-red-500 mt-1">{errors.cardName}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          value={paymentData.expiry}
                          onChange={(e) =>
                            setPaymentData({
                              ...paymentData,
                              expiry: formatExpiry(e.target.value),
                            })
                          }
                          maxLength={5}
                          placeholder="MM/YY"
                          className={`w-full px-4 py-3 border ${
                            errors.expiry ? "border-red-500" : "border-gray-light"
                          } focus:border-luxe-black focus:outline-none`}
                        />
                        {errors.expiry && (
                          <p className="text-sm text-red-500 mt-1">{errors.expiry}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          CVV *
                        </label>
                        <input
                          type="text"
                          value={paymentData.cvv}
                          onChange={(e) =>
                            setPaymentData({
                              ...paymentData,
                              cvv: e.target.value.replace(/\D/g, "").slice(0, 4),
                            })
                          }
                          maxLength={4}
                          placeholder="123"
                          className={`w-full px-4 py-3 border ${
                            errors.cvv ? "border-red-500" : "border-gray-light"
                          } focus:border-luxe-black focus:outline-none`}
                        />
                        {errors.cvv && (
                          <p className="text-sm text-red-500 mt-1">{errors.cvv}</p>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-gray mt-4">
                      This is a demo checkout. No real payment will be processed.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Confirmation */}
              {currentStep === "confirmation" && (
                <motion.div
                  key="confirmation"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <Check className="w-10 h-10 text-green-600" />
                  </motion.div>
                  <h2 className="text-3xl font-display mb-4">Order Confirmed!</h2>
                  <p className="text-gray mb-2">
                    Thank you for your order. Your order number is:
                  </p>
                  <p className="text-2xl font-semibold text-gold mb-8">{orderNumber}</p>
                  <p className="text-gray mb-8 max-w-md mx-auto">
                    We&apos;ve sent a confirmation email to {shippingData.email}. You can
                    track your order status in your account.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/products" className="btn-primary">
                      Continue Shopping
                    </Link>
                    <Link href="/account" className="btn-secondary">
                      View Account
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            {currentStep !== "confirmation" && (
              <div className="flex items-center justify-between mt-8">
                {currentStep !== "cart" ? (
                  <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-gray hover:text-luxe-black transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back
                  </button>
                ) : (
                  <Link
                    href="/cart"
                    className="flex items-center gap-2 text-gray hover:text-luxe-black transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Edit Bag
                  </Link>
                )}
                <motion.button
                  onClick={handleNext}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary"
                >
                  {currentStep === "payment" ? "Place Order" : "Continue"}
                </motion.button>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          {currentStep !== "confirmation" && (
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-light p-6 sticky top-32">
                <h3 className="text-lg font-display font-semibold mb-6">
                  Order Summary
                </h3>

                {/* Items */}
                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative w-16 h-20 bg-cream-dark flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                        <span className="absolute -top-2 -right-2 w-5 h-5 bg-luxe-black text-white text-xs rounded-full flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.name}</p>
                        <p className="text-xs text-gray">
                          {item.size && `${item.size}`}
                          {item.size && item.color && " / "}
                          {item.color && `${item.color}`}
                        </p>
                      </div>
                      <p className="text-sm font-medium">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-light pt-4 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray">Shipping</span>
                    <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray">Tax</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                </div>

                <div className="flex justify-between text-lg font-semibold mt-4 pt-4 border-t border-gray-light">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
