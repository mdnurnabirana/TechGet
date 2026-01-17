"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
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

export default function ProductDetail() {
    const params = useParams();
    const id = params?.id;

    // TODO: replace with real fetch to backend when available
    const product = sampleProduct;
    const [stock, setStock] = useState(product.stock ?? 0);
    const [loading, setLoading] = useState(false);

    const handleBuy = async () => {
        if (stock <= 0) {
            toast.error("Out of stock");
            return;
        }
        setLoading(true);
        try {
            await new Promise((r) => setTimeout(r, 300));
            setStock((s) => Math.max(0, s - 1));
            toast.success("Purchase successful");
        } catch (err) {
            console.error(err);
            toast.error("Purchase failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen p-8 bg-base-200">
            <div className="max-w-4xl mx-auto bg-base-100 p-6 rounded-2xl shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <img src={product.image} alt={product.name} className="w-full h-80 object-cover rounded" />

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