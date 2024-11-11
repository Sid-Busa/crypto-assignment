import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user"));
      setUser(updatedUser);
    };

    // Listen for local storage changes
    window.addEventListener("storage", handleStorageChange);

    // Clean up listener
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  if (user) {
    return <Outlet />;
  }

  return <Navigate to="/" />;
};

export default ProtectedRoute;
