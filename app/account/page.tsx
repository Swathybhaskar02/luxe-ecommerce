"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Settings,
  LogOut,
  ChevronRight,
  ShoppingBag,
} from "lucide-react";
import { useAuthStore } from "@/stores/auth-store";
import { useWishlistStore } from "@/stores/wishlist-store";
import { useCartStore } from "@/stores/cart-store";

const menuItems = [
  {
    icon: Package,
    label: "Orders",
    description: "View your order history",
    href: "/account/orders",
  },
  {
    icon: Heart,
    label: "Wishlist",
    description: "Your saved items",
    href: "/wishlist",
  },
  {
    icon: MapPin,
    label: "Addresses",
    description: "Manage shipping addresses",
    href: "/account/addresses",
  },
  {
    icon: CreditCard,
    label: "Payment Methods",
    description: "Manage payment options",
    href: "/account/payments",
  },
  {
    icon: Settings,
    label: "Account Settings",
    description: "Update your preferences",
    href: "/account/settings",
  },
];

export default function AccountPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const wishlistItems = useWishlistStore((state) => state.items);
  const cartItems = useCartStore((state) => state.items);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-8 lg:py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-luxe-black text-white p-8 mb-8"
          >
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center">
                <span className="text-3xl font-display font-bold text-luxe-black">
                  {user.firstName.charAt(0)}
                  {user.lastName.charAt(0)}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-display mb-1">
                  Welcome back, {user.firstName}!
                </h1>
                <p className="text-white/70">{user.email}</p>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            <div className="bg-white p-6 text-center border border-gray-light">
              <Package className="w-6 h-6 mx-auto mb-2 text-gold" />
              <p className="text-2xl font-display font-semibold">0</p>
              <p className="text-sm text-gray">Orders</p>
            </div>
            <div className="bg-white p-6 text-center border border-gray-light">
              <Heart className="w-6 h-6 mx-auto mb-2 text-gold" />
              <p className="text-2xl font-display font-semibold">
                {wishlistItems.length}
              </p>
              <p className="text-sm text-gray">Wishlist</p>
            </div>
            <div className="bg-white p-6 text-center border border-gray-light">
              <ShoppingBag className="w-6 h-6 mx-auto mb-2 text-gold" />
              <p className="text-2xl font-display font-semibold">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </p>
              <p className="text-sm text-gray">In Bag</p>
            </div>
            <div className="bg-white p-6 text-center border border-gray-light">
              <CreditCard className="w-6 h-6 mx-auto mb-2 text-gold" />
              <p className="text-2xl font-display font-semibold">$0</p>
              <p className="text-sm text-gray">Saved</p>
            </div>
          </motion.div>

          {/* Menu */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white border border-gray-light divide-y divide-gray-light"
          >
            {menuItems.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center justify-between p-6 hover:bg-cream-dark transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-cream-dark rounded-full flex items-center justify-center group-hover:bg-gold transition-colors">
                    <item.icon className="w-5 h-5 group-hover:text-luxe-black transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-medium">{item.label}</h3>
                    <p className="text-sm text-gray">{item.description}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray group-hover:text-luxe-black transition-colors" />
              </Link>
            ))}
          </motion.div>

          {/* Logout */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            onClick={handleLogout}
            className="w-full mt-6 p-4 flex items-center justify-center gap-2 text-gray hover:text-red-500 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </motion.button>

          {/* Recent Activity Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12"
          >
            <h2 className="text-2xl font-display mb-6">Recent Activity</h2>
            <div className="bg-white border border-gray-light p-12 text-center">
              <Package className="w-12 h-12 mx-auto text-gray-light mb-4" />
              <h3 className="font-medium mb-2">No recent orders</h3>
              <p className="text-gray mb-6">
                Start shopping to see your order history here
              </p>
              <Link href="/products" className="btn-primary inline-block">
                Shop Now
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
