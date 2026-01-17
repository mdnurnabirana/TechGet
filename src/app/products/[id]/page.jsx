"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Rings } from "react-loader-spinner";
import toast from "react-hot-toast";

export default function ProductDetail() {
    const params = useParams();
    const id = params?.id;

    const [product, setProduct] = useState(null);
    const [stock, setStock] = useState(0);
    const [loading, setLoading] = useState(false);
    const [loadingProduct, setLoadingProduct] = useState(true);

    useEffect(() => {
        let mounted = true;
        async function load() {
            if (!id) return;
            try {
                const res = await fetch(`/api/products/${id}`);
                if (!res.ok) throw new Error("Not found");
                const data = await res.json();
                if (mounted) {
                    setProduct(data.product || null);
                    setStock((data.product?.stock ?? 0) || 0);
                }
            } catch (err) {
                console.error(err);
                toast.error("Failed to load product");
            } finally {
                if (mounted) setLoadingProduct(false);
            }
        }
        load();
        return () => (mounted = false);
    }, [id]);

    const handleBuy = async () => {
        if (stock <= 0) {
            toast.error("Out of stock");
            return;
        }
        setLoading(true);
        try {
            const res = await fetch("/api/purchases", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId: product._id, price: product.price, quantity: 1 }),
            });
            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.message || "Purchase failed");
            }
            setStock((s) => Math.max(0, s - 1));
            toast.success("Purchase successful");
        } catch (err) {
            console.error(err);
            toast.error(err.message || "Purchase failed");
        } finally {
            setLoading(false);
        }
    };

    if (loadingProduct)
        return (
            <div className="min-h-screen p-8 bg-base-200">
                <div className="flex items-center justify-center py-16">
                    <Rings visible={true} height="80" width="80" color="#4fa94d" ariaLabel="rings-loading" wrapperStyle={{}} wrapperClass="" />
                </div>
            </div>
        );
    if (!product) return <div className="min-h-screen p-8 bg-base-200">Product not found</div>;

    return (
        <div className="min-h-screen p-8 bg-base-200">
            <div className="max-w-4xl mx-auto bg-base-100 p-6 rounded-2xl shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="w-full h-80 relative rounded overflow-hidden">
                        {product.image ? (
                            <Image src={product.image} alt={product.name} fill className="object-cover" unoptimized />
                        ) : null}
                    </div>

                    <div>
                        <div className="text-sm text-content">{product.category}</div>
                        <h1 className="text-2xl font-bold text-title">{product.name}</h1>

                        <p className="mt-4 text-content">{product.description}</p>

                        <div className="mt-6 flex items-center justify-between">
                            <div>
                                <div className="text-3xl font-bold text-primary">${product.price}</div>
                                <div className="text-sm text-content">Stock: {stock}</div>
                            </div>

                            <button
                                onClick={handleBuy}
                                disabled={stock <= 0 || loading}
                                className={`py-3 px-6 rounded-lg font-semibold ${
                                    stock > 0 ? "bg-primary text-white" : "bg-base-300 text-content"
                                }`}
                            >
                                {loading ? "Buying..." : stock > 0 ? "Buy now" : "Sold out"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}