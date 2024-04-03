// auth.js

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const checkAuthentication = () => {
    toast.loading("Checking Authentication");
    const localFid = localStorage.getItem("localFid");
    const localJwt = localStorage.getItem("jwtToken");

    if (localJwt !== null || localJwt !== undefined || localJwt !== "") {
      if (localFid !== null || localFid !== undefined || localFid !== "") {
        toast.dismiss();
        toast.success("Login Successful");
        return true;
      } else {
        toast.dismiss();
        toast.error("Login Failed - Fid not found");
        return false;
      }
    } else {
      toast.dismiss();
      toast.error("Login Failed - JWT not found");
      return false;
    }
  };

  useEffect(() => {
    const isAuthenticated = checkAuthentication();
    setIsAuthenticated(isAuthenticated);
  }, []);

  useEffect(() => {
    // Redirect based on authentication status
    if (!isAuthenticated) {
      router.push("/auth");
    } else {
      router.push("/feed");
    }
  }, [isAuthenticated]);

  return isAuthenticated;
}
