"use client";

import { useEffect, useState } from "react";

const useUserRole = () => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const res = await fetch("/api/users/role");
        const data = await res.json();
        setRole(data.role || "user");
      } catch {
        setRole("user");
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, []);

  return { role, loading };
};

export default useUserRole;