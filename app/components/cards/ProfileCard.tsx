import {
  apiDoesUserFollow,
  apiFollowUser,
  apiUnfollowUser,
} from "@/app/server";
import { utilConsoleOnlyDev } from "@/app/utils";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import quackCover from "@/assets/quackCover.jpg";

const ProfileCard = ({
  profilePfp,
  profileFollowing,
  profileFollowers,
  profileDisplayName,
  profileUsername,
  profileBio,
  profileFid,
}: any) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isMe, setIsMe] = useState(false);

  const fnCheckUserFollowing = async () => {
    const res = await apiDoesUserFollow({ fid: profileFid });
    if (res) {
      utilConsoleOnlyDev(res);
      if (res.doesFollowUser) {
        setIsFollowing(true);
      }
      if (!res.doesFollowUser) {
        setIsFollowing(false);
      }
    }
  };

  const fnFollowUser = async () => {
    if (!isFollowing) {
      const res = await apiFollowUser({ fid: profileFid });

      utilConsoleOnlyDev(res);
      if (res) {
        setIsFollowing(!isFollowing);
      }
    }

    if (isFollowing) {
      const res = await apiUnfollowUser({ fid: profileFid });

      utilConsoleOnlyDev(res);
      if (res) {
        setIsFollowing(!isFollowing);
      }
    }
  };

  useEffect(() => {
    if (profileFid === localStorage.getItem("localFid")) {
      setIsMe(true);
    }
  }, [profileFid]);

  useEffect(() => {
    fnCheckUserFollowing();
  }, [isFollowing, profileFid]);

  return (
    <>
      <div className="bg-white flex flex-col gap-4 rounded-md px-8 py-8">
        <div className=" flex justify-end bg-[#FFD147] rounded-md">
          <Image
            src={quackCover}
            className="rounded-md h-32  object-contain"
            alt="profile"
            // width={96}
            // height={96}
          />
        </div>
        <div className="flex justify-between gap-4 items-center align-middle bg-white rounded-md px-16">
          <div className=" rounded-full p-3 -mt-16 ">
            <Image
              src={profilePfp}
              className="rounded-full max-w-[96px] max-h-[96px]"
              alt="profile"
              width={96}
              height={96}
            />
          </div>

          <div className="flex gap-1">
            <div className="">{profileFollowing}</div>
            <div className="text-slate-400">Following</div>
          </div>

          <div className="flex gap-1">
            <div className="">{profileFollowers}</div>
            <div className="text-slate-400">Followers</div>
          </div>

          {!isMe && isFollowing ? (
            <Button color="default" variant="bordered" onClick={fnFollowUser}>
              Unfollow
            </Button>
          ) : (
            <Button color="default" variant="bordered" onClick={fnFollowUser}>
              Follow
            </Button>
          )}

          {isMe && (
            <Button color="default" variant="bordered">
              Edit Profile
            </Button>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <div className="text-md font-semibold">{profileDisplayName}</div>
            <div className="text-sm font-light text-slate-400">
              @{profileUsername}
            </div>
          </div>
          <div className="text-sm font-light">{profileBio}</div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
