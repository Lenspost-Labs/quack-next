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
      <div className="">
        <Image src={profilePfp} alt="profile" width={100} height={100} />

        <div className="">{profileFollowing}</div>
        <div className="">Following</div>
        <div className="">{profileFollowers}</div>
        <div className="">Followers</div>

        <div className="">{profileDisplayName}</div>
        <div className="">@{profileUsername}</div>
        <div className="">{profileBio}</div>
      </div>
    </>
  );
};

export default ProfileCard;
