"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState(session?.user || null);

  useEffect(() => {
    setCurrentUser(session?.user || null);
  }, [session]);

  const loading = status === "loading";

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

  const googleLogin = async () => {
    await signIn("google", {
      callbackUrl: "/",
    });
  };

  const logout = async () => {
    toast.success("Logged out");
    await signOut({ redirect: false });
    router.replace("/login");
  };

  const updateUser = (updates) => {
    setCurrentUser((prev) => (prev ? { ...prev, ...updates } : prev));
  };

  return (
    <AuthContext.Provider
      value={{
        user: currentUser,
        login,
        googleLogin,
        logout,
        loading,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);