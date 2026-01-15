"use client";

import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";
import Logo from "./Logo";
import NavLink from "./NavLink";

const navItems = [
  { id: 1, menu: "Home", href: "/" },
  { id: 2, menu: "Products", href: "/products" },
];

const Navbar = () => {
  const cartCount = 3; 

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

          <Link
            href="/login"
            className="bg-primary text-text-on-primary px-5 py-2 rounded-lg font-medium hover:bg-primary/80 transition"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;