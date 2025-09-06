
import React, { useEffect, useState } from "react";
import { onAuth } from "../services/auth";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsub = onAuth(setUser);
    return () => unsub && unsub();
  }, []);

  if (user === undefined) {
    return <div className="p-8 text-center">Loading...</div>;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
