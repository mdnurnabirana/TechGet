"use client";

import React, { useState } from "react";
import ProductCard from "@/components/Cards/ProductCard";
import toast from "react-hot-toast";

const sampleProduct = {
    _id: "696b88cc8676941eccb060eb",
    name: "Vinova Headphone Sociis Buds T100 Magnis Buds",
    category: "Audio",
    image: "https://ecommax.risingbamboo.com/wp-content/uploads/2024/04/1-10.jpg",
    price: 10,
    stock: 10,
    description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit am…",
};

const Products = () => {
    const [items] = useState([sampleProduct, sampleProduct, sampleProduct, sampleProduct]);

    const handleBuy = async (product) => {
        try {
            const res = await fetch("/api/purchases", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId: product._id, price: product.price, quantity: 1 }),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.message || "Failed to purchase");
            }

            toast.success("Purchase recorded");
        } catch (err) {
            console.error(err);
            toast.error(err.message || "Purchase failed");
        }
    };

    return (
        <div className="min-h-screen p-8 bg-base-200">
            <h1 className="text-2xl font-bold mb-6">Products</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {items.map((p, i) => (
                    <ProductCard key={i} product={p} onBuy={handleBuy} />
                ))}
            </div>
        </div>
    );
};

export default Products;