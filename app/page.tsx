"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const localFid = localStorage.getItem("localFid");
  const localJwt = localStorage.getItem("jwtToken");

  const fnCheckAuth = async () => {
    if (localFid && localJwt) {
      redirect("/feed");
    } else {
      redirect("/auth");
    }
  };

  useEffect(() => {
    fnCheckAuth();
  });
  
  return <>Root Page</>;
}
