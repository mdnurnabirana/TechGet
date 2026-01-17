"use client";

import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const ProfileForm = ({ user }) => {
  const router = useRouter();
  const { updateUser } = useAuth();

  const [form, setForm] = useState({
    name: user?.name || "",
    photoURL: user?.photoURL || user?.image || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/users/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          photoURL: form.photoURL,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Update failed");
        return;
      }
      
      updateUser({ name: form.name, image: form.photoURL });

      toast.success("Profile updated successfully!");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-base-100 p-8 rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      <div className="flex justify-center mb-6">
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary">
          <Image
            src={form.photoURL || "/assets/avatar_fallback.png"}
            alt={form.name || "User"}
            width={96}
            height={96}
            className="object-cover"
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Photo URL</label>
          <input
            name="photoURL"
            value={form.photoURL}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="https://example.com/avatar.jpg"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/80 transition disabled:opacity-50"
        >
          {loading ? "Saving..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;