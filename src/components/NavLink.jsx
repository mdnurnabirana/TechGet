"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ href, children, className = "" }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`
        font-medium transition
        ${isActive ? "text-primary" : "text-text-body hover:text-primary"}
        ${className}
      `}
    >
      {children}
    </Link>
  );
};

export default NavLink;