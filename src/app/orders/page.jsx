"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Rings } from "react-loader-spinner";
import Link from "next/link";
import toast from "react-hot-toast";

export default function OrdersPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await fetch("/api/purchases");
        if (!res.ok) throw new Error("Unauthorized or failed to fetch orders");
        const data = await res.json();
        if (mounted) setItems(data.purchases || []);
      } catch (err) {
        console.error(err);
        toast.error("Could not load orders");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => (mounted = false);
  }, []);

  if (loading)
    return (
      <div className="min-h-screen p-8 bg-base-200">
        <div className="flex items-center justify-center py-16">
          <Rings visible={true} height="80" width="80" color="#4fa94d" ariaLabel="rings-loading" wrapperStyle={{}} wrapperClass="" />
        </div>
      </div>
    );
  if (!items.length) return <div className="min-h-screen p-8 bg-base-200">No orders found</div>;

  return (
    <div className="min-h-screen p-8 bg-base-200">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      <div className="space-y-4">
        {items.map((o) => (
          <div key={o._id} className="bg-base-100 p-4 rounded-lg shadow flex items-center gap-4">
            <div className="w-24 h-24 relative rounded overflow-hidden bg-gray-100">
              {o.product?.image ? (
                <Image src={o.product.image} alt={o.product.name} fill className="object-cover" unoptimized />
              ) : null}
            </div>

            <div className="flex-1">
              <Link href={`/products/${o.product?._id}`} className="text-lg font-semibold text-primary">
                {o.product?.name || "(product removed)"}
              </Link>
              <div className="text-sm text-content">Quantity: {o.quantity}</div>
              <div className="text-sm text-content">Price: ${o.price}</div>
              <div className="text-sm text-content">Ordered: {new Date(o.created_at).toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
