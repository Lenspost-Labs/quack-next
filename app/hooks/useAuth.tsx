// auth.js

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { utilConsoleOnlyDev } from "../utils";

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const checkAuthentication = () => {
    // toast.loading("Checking Authentication");
    const localFid = localStorage.getItem("localFid");
    const localJwt = localStorage.getItem("jwtToken");

    utilConsoleOnlyDev(`localFid is ${localFid}`);
    utilConsoleOnlyDev(`localJwt is ${localJwt}`);

    // toast.dismiss();
    if (localJwt !== null && localJwt !== undefined && localJwt !== "") {
      toast.success("Authentication Successful");
      utilConsoleOnlyDev("Authentication Successful");
      return true;
    } else {
      toast.error("Authentication Failed - Fid not found");
      utilConsoleOnlyDev("Authentication Failed - Fid not found");
      return false;
    }
  };

  useEffect(() => {
    const isAuthenticated = checkAuthentication();
    setIsAuthenticated(isAuthenticated);
  }, []); // Empty dependency array to run the effect only once

  useEffect(() => {
    // Redirect based on authentication status
    if (!isAuthenticated) {
      router.push("/auth");
    } else {
      router.push("/feed");
    }
  }, [isAuthenticated, router]);

  return {
    isAuthenticated,
    checkAuthentication,
  };
}
