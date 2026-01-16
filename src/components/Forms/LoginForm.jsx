"use client";

import { signIn } from "next-auth/react";

const LoginForm = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
    });
  };

  return (
    <div className="w-96 p-6 rounded-xl bg-base-100 shadow">
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="input input-bordered w-full"
          required
        />
        <button className="btn btn-primary w-full">Login</button>
      </form>

      <div className="divider">OR</div>

      <button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="btn btn-outline w-full"
      >
        Continue with Google
      </button>
    </div>
  );
};

export default LoginForm;