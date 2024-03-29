import { Button } from "@nextui-org/react";
import Image from "next/image";
import React from "react";

const ProfileCard = ({
  profilePfp,
  profileFollowing,
  profileFollowers,
  profileDisplayName,
  profileUsername,
  profileBio,
}: any) => {
  return (
    <>
      <div className="bg-white flex flex-col gap-4 rounded-md mt-24 px-8">
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

          <Button color="default" variant="bordered">
            Edit Profile
          </Button>
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
