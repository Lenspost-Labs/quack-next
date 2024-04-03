"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";
import useAuth from "./hooks/useAuth";
import { utilConsoleOnlyDev } from "./utils";

export default function Home() {
  const { isAuthenticated } = useAuth();
  utilConsoleOnlyDev(`isAuthenticated is ${isAuthenticated}`);

  return <>Root Page</>;
}
