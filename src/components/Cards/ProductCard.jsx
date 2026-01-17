"use client";

import React, { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

const CartIcon = ({ className = "w-4 h-4 mr-2" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 3h2l.4 2M7 13h10l3-8H6.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="10" cy="20" r="1" fill="currentColor" />
        <circle cx="18" cy="20" r="1" fill="currentColor" />
    </svg>
);

const ProductCard = ({ product = {}, onBuy }) => {
    const [stock, setStock] = useState(product.stock ?? 0);
    const [loading, setLoading] = useState(false);

    const handleBuy = async () => {
        if (stock <= 0) {
            toast.error("Out of stock");
            return;
        }

        setLoading(true);
        try {
            if (onBuy) {
                await onBuy(product);
            } else {
                await fetch("/api/purchases", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ productId: product._id, price: product.price, quantity: 1 }),
                });
            }

            setStock((s) => Math.max(0, s - 1));
            toast.success("Purchase successful");
        } catch (err) {
            console.error("buy error", err);
            toast.error("Purchase failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="rounded-2xl overflow-hidden shadow bg-base-100">
            <div className="w-full h-56 bg-gray-100">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>

            <div className="p-4">
                <div className="flex items-center justify-between text-sm text-content mb-1">
                    <span className="capitalize">{product.category}</span>
                    <span className="text-xs text-content">Stock: {stock}</span>
                </div>

                <h3 className="text-md font-semibold text-title leading-tight">{product.name}</h3>

                <div className="mt-4 flex items-center justify-between">
                    <Link href={`/products/${product._id}`} className="text-sm text-primary font-medium">
                        View detail
                    </Link>

                    <button
                        onClick={handleBuy}
                        disabled={stock <= 0 || loading}
                        className={`inline-flex items-center py-2 px-3 rounded-lg font-semibold ${
                            stock > 0 ? "bg-primary text-white" : "bg-base-300 text-content cursor-not-allowed"
                        }`}
                    >
                        <CartIcon />
                        {loading ? "Buying..." : stock > 0 ? "Buy" : "Sold out"}
                    </button>
                </div>

                <div className="mt-2 text-2xl font-bold text-primary">${product.price}</div>
            </div>
        </div>
    );
};

export default ProductCard;