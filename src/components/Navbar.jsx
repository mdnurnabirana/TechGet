"use client";

import Link from "next/link";
import { FiShoppingCart, FiLogOut, FiUser } from "react-icons/fi";
import Logo from "./Logo";
import NavLink from "./NavLink";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { id: 1, menu: "Home", href: "/" },
  { id: 2, menu: "Products", href: "/products" },
];

const Navbar = () => {
  const cartCount = 3;
  const { user, logout, loading } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } finally {
      setIsLoggingOut(false);
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
          <Link href="/cart" className="relative">
            <FiShoppingCart className="text-2xl text-text-heading" />
            <span className="absolute -top-2 -right-2 bg-primary text-text-on-primary text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          </Link>

          {loading && (
            <div className="px-4 py-2 text-sm text-neutral">Checking session...</div>
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
                className="flex items-center gap-2 px-3 py-1 border rounded-md bg-base-100"
              >
                <FiUser />
                <span className="hidden sm:inline">{user.name || user.email}</span>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-base-100 rounded-lg shadow-lg border border-base-200 overflow-hidden z-50">
                  <Link
                    href="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="block px-4 py-2 hover:bg-base-200"
                  >
                    <div className="flex items-center gap-2">
                      <FiUser /> <span>My Profile</span>
                    </div>
                  </Link>

                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="w-full text-left px-4 py-2 hover:bg-base-200 flex items-center gap-2"
                  >
                    <FiLogOut />
                    <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
                  </button>
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