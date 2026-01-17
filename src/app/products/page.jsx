"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "@/components/Cards/ProductCard";
import toast from "react-hot-toast";
import { Rings } from "react-loader-spinner";

const Products = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        async function load() {
            try {
                const res = await fetch("/api/products");
                if (!res.ok) throw new Error("Failed to fetch products");
                const data = await res.json();
                if (mounted) setItems(data.products || []);
            } catch (err) {
                console.error(err);
                toast.error("Could not load products");
            } finally {
                if (mounted) setLoading(false);
            }
        }
        load();
        return () => (mounted = false);
    }, []);

    const handleBuy = async (product) => {
        try {
            const res = await fetch("/api/purchases", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId: product._id, price: product.price, quantity: 1 }),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                const err = new Error(data.message || "Failed to purchase");
                // show error toast and rethrow so callers (e.g. ProductCard) know the purchase failed
                toast.error(err.message || "Purchase failed");
                throw err;
            }

            toast.success("Purchase recorded");
        } catch (err) {
            console.error(err);
            // propagate error to caller UI; parent already displayed toast for API errors
            throw err;
        }
    };

    return (
        <div className="min-h-screen p-8 bg-base-200">
            <h1 className="text-2xl font-bold mb-6">Products</h1>

            {loading ? (
                <div className="flex items-center justify-center py-16">
                    <Rings
                        visible={true}
                        height="80"
                        width="80"
                        color="#4fa94d"
                        ariaLabel="rings-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {items.map((p) => (
                        <ProductCard key={p._id} product={p} onBuy={handleBuy} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Products;