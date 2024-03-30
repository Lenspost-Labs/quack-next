"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const localFid = localStorage.getItem("localFid");
    const localJwt = localStorage.getItem("jwtToken");

    const fnCheckAuth = async () => {
      if (localFid && localJwt) {
        router.push("/feed");
      } else {
        router.push("/auth");
      }
    };

    fnCheckAuth();
  }, [router]);

  return <>Root Page</>;
}
