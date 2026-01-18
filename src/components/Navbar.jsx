"use client";

import Link from "next/link";
import {
  FiShoppingCart,
  FiLogOut,
  FiUser,
  FiHome,
  FiShoppingBag,
  FiPlusSquare,
  FiList,
} from "react-icons/fi";
import Logo from "./Logo";
import NavLink from "./NavLink";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import AvatarSkeleton from "./LoadingSkeleton/AvatarSkeleton";
import useUserRole from "@/hooks/useUserRole";

const navItems = [
  { id: 1, menu: "Home", href: "/" },
  { id: 2, menu: "Products", href: "/products" },
];

export const roleBasedNav = {
  user: [
    {
      id: 1,
      label: "My Profile",
      href: "/profile",
      icon: FiUser,
    },
    {
      id: 2,
      label: "My Orders",
      href: "/orders",
      icon: FiShoppingBag,
    },
  ],

  admin: [
    // {
    //   id: 1,
    //   label: "My Profile",
    //   href: "/profile",
    //   icon: FiUser,
    // },
    {
      id: 2,
      label: "Add Product",
      href: "/admin/add-product",
      icon: FiPlusSquare,
    },
  ],
};

const Navbar = () => {
  // const cartCount = 3;
  const { user, logout, loading } = useAuth();
  const { role, loading: roleLoading } = useUserRole();
  console.log("role is: ", role);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } finally {
      setIsLoggingOut(false);
      setProfileOpen(false);
    }
  };

  return (
    <header className="bg-base-300 border-b border-base-200 py-2">
      <div className="container mx-auto flex items-center justify-between">
        <Logo />

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink key={item.id} href={item.href}>
              {item.menu}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          {loading && (
            <div className="px-4 py-2 text-sm text-neutral">
              <AvatarSkeleton />
            </div>
          )}

          {!loading && !user && (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="bg-primary text-text-on-primary px-4 py-2 rounded-lg font-medium hover:bg-primary/80 transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-secondary text-white px-4 py-2 rounded-lg font-medium hover:bg-secondary/80 transition"
              >
                Register
              </Link>
            </div>
          )}

          {!loading && user && (
            <div className="relative">
              <button
                onClick={() => setProfileOpen((p) => !p)}
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary"
              >
                <Image
                  src={user.image || "/assets/avatar_fallback.png"}
                  alt={user.name || "User"}
                  height={40}
                  width={40}
                  className="w-full h-full object-cover"
                />
              </button>

              {profileOpen && (
                <div className="text-neutral absolute right-0 mt-3 w-72 bg-base-100 rounded-2xl shadow-xl border border-base-200 overflow-hidden z-50 animate-fadeIn">
                  <div className="p-5 border-b border-base-200">
                    <p className="font-bold text-lg truncate">{user.name}</p>
                    <p className="text-sm text-neutral truncate">
                      {user.email}
                    </p>
                  </div>

                  <div className="py-3">
                    {roleBasedNav[role || "user"]?.map((item) => {
                      const Icon = item.icon;

                      return (
                        <Link
                          key={item.id}
                          href={item.href}
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-4 px-5 py-3 hover:bg-base-200 transition"
                        >
                          <Icon className="text-xl" />
                          <span>{item.label}</span>
                        </Link>
                      );
                    })}

                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="bg-secondary flex items-center gap-4 w-full px-5 py-3 text-white hover:bg-secondary/80 transition disabled:opacity-70"
                    >
                      <FiLogOut className="text-xl" />
                      <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;