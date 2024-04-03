"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";
import useAuth from "./hooks/useAuth";

export default function Home() {
  const isAuthenticated = useAuth();

  useEffect(() => {
    isAuthenticated ? redirect("/feed") : redirect("/auth");
  }, []);

  return <>Root Page</>;
}
