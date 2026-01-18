// components/Footer.jsx
import React from "react";
import Link from "next/link";
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiYoutube,
  FiPhone,
  FiMail,
  FiMapPin,
} from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-base-200 text-base-content">
      <div className="container mx-auto px-5 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand & Description */}
          <div>
            <h3 className="text-2xl font-bold text-primary mb-4">
              TechGet Ultra
            </h3>
            <p className="text-base-content/70 mb-6">
              Your trusted destination for premium mobile accessories, gadgets,
              computer components and quality automotive parts in Bangladesh.
            </p>

            <div className="flex gap-4">
              <a
                href="#"
                className="text-base-content/70 hover:text-primary transition-colors"
              >
                <FiFacebook size={22} />
              </a>
              <a
                href="#"
                className="text-base-content/70 hover:text-primary transition-colors"
              >
                <FiTwitter size={22} />
              </a>
              <a
                href="#"
                className="text-base-content/70 hover:text-primary transition-colors"
              >
                <FiInstagram size={22} />
              </a>
              <a
                href="#"
                className="text-base-content/70 hover:text-primary transition-colors"
              >
                <FiYoutube size={22} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-5">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-base-content/70 hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-base-content/70 hover:text-primary transition-colors"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-base-content/70 hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-base-content/70 hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-5">Support</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-base-content/70 hover:text-primary transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-base-content/70 hover:text-primary transition-colors"
                >
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-base-content/70 hover:text-primary transition-colors"
                >
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-base-content/70 hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-5">Get in Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FiMapPin className="text-primary mt-1" size={20} />
                <span className="text-base-content/80">
                  Chittagong, Bangladesh
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="text-primary" size={20} />
                <span className="text-base-content/80">+880 1305 592904</span>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="text-primary" size={20} />
                <span className="text-base-content/80">
                  support@techgetultra.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-base-300 mt-5 pt-4 text-center text-sm text-base-content/60">
          <p>
            © {new Date().getFullYear()} TechGet Ultra. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}