"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const categories = [
  "Tablet",
  "SmartPhone",
  "Game Console",
  "Camera",
  "SmartWatch",
  "Drone & Flycam",
  "Audio",
  "Computer",
];

export default function AddProductPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    category: categories[0],
    image: "",
    price: "",
    stock: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        toast.error(data.message || "Failed to add product");
        return;
      }

      toast.success("Product added successfully");
      router.push("/admin/products");
    } catch (err) {
      console.error(err);
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen p-8 bg-base-200">
      <div className="max-w-2xl mx-auto bg-base-100 p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Add Product</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Product Name</label>
            <input name="name" value={form.name} onChange={handleChange} className="w-full p-3 border rounded-lg" required />
          </div>

          <div>
            <label className="block mb-1 font-medium">Category</label>
            <select name="category" value={form.category} onChange={handleChange} className="w-full p-3 border rounded-lg">
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Product Picture URL</label>
            <input name="image" value={form.image} onChange={handleChange} className="w-full p-3 border rounded-lg" placeholder="https://example.com/photo.jpg" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Price</label>
              <input name="price" value={form.price} onChange={handleChange} type="number" step="0.01" className="w-full p-3 border rounded-lg" required />
            </div>
            <div>
              <label className="block mb-1 font-medium">Stock</label>
              <input name="stock" value={form.stock} onChange={handleChange} type="number" className="w-full p-3 border rounded-lg" required />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} className="w-full p-3 border rounded-lg" rows={5} />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-primary text-white py-3 rounded-lg font-semibold">
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
