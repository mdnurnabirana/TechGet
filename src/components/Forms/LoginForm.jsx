"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { AiOutlineGoogle } from "react-icons/ai";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const { login, googleLogin, loading } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(form);
    if (success) router.replace("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-base-200 p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-title mb-6 text-center">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="bg-base-100 w-full p-3 border border-primary rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            autoComplete="current-password"
            className="bg-base-100 w-full p-3 border border-primary rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-orange-500 transition duration-300 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="divider my-6">- OR -</div>

        <button
          onClick={googleLogin}
          className="bg-primary text-white font-semibold w-full flex items-center justify-center gap-2 border border-base-300 py-3 rounded-lg hover:bg-primary/70 hover:cursor-pointer transition duration-300"
        >
          <AiOutlineGoogle className="w-5 h-5 text-white" />
          Continue with Google
        </button>

        <p className="text-content text-sm mt-4 text-center">
          Don't have an account?{' '}
          <span
            onClick={() => router.push("/register")}
            className="text-primary cursor-pointer font-medium"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;