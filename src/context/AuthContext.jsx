"use client";

import { createContext, useContext } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const loading = status === "loading";

  // ✅ Email / Password login
  const login = async ({ email, password }) => {
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      toast.error("Invalid email or password");
      return false;
    }

    toast.success("Logged in successfully!");
    router.replace("/");
    return true;
  };

  // ✅ Google OAuth login (popup handled by NextAuth)
  const googleLogin = async () => {
    await signIn("google", {
      callbackUrl: "/",
    });
  };

  // ✅ Logout (toast first, then redirect)
  const logout = async () => {
    toast.success("Logged out");
    await signOut({ redirect: false });
    router.replace("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user: session?.user || null,
        login,
        googleLogin,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
