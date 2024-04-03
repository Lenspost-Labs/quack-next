import { useState, useEffect } from "react";
import { apiGetProfile } from "../server";
import { utilConsoleOnlyDev } from "../utils";
import useSolWallet from "./useSolWallet";
import useAuth from "./useAuth";

const useUserProfile = () => {
  const localFid = localStorage.getItem("localFid");
  const { solPublicKey } = useSolWallet();
  const isAuthenticated = useAuth();

  const [userProfile, setUserProfile] = useState({
    userPfp: "",
    userFid: "",
    userUsername: "",
    userDisplayName: "",
    userWalAddress: "",
  });

  useEffect(() => {
    let isMounted = true;
    const fetchProfile = async () => {
      try {
        if (!isAuthenticated) return;
        const profileData = await apiGetProfile(localFid || "");

        utilConsoleOnlyDev("profileData in useUserProfile");
        utilConsoleOnlyDev(profileData);

        if (isMounted) {
          setUserProfile({
            userPfp: profileData.userPfp,
            userFid: profileData.fid,
            userUsername: profileData.username,
            userDisplayName: profileData.name,
            userWalAddress: solPublicKey?.toBase58() || "",
          });
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchProfile();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, []); // Empty dependency array to run effect only once

  return userProfile;
};

export default useUserProfile;
