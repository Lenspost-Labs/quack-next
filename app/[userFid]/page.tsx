"use client";

import { useEffect, useState } from "react";
import { apiGetProfile, apiGetUserPosts } from "../server";
import { utilConsoleOnlyDev } from "../utils";
import ProfileCard from "../components/cards/ProfileCard";
import PostDetailsCard from "../components/cards/PostDetailsCard";
import { Input, Spinner } from "@nextui-org/react";
import { QuackIconSearch } from "../globals/icons/MainIcons";

export default function UserProfilePage({
  params,
}: {
  params: { userFid: string };
}) {
  const { userFid } = params;

  const [profileData, setProfileData] = useState<any>();
  const [userPosts, setUserPosts] = useState<any>();
  const [loadingPosts, setLoadingPosts] = useState(true);

  const fnGetProfile = async () => {
    const response = await apiGetProfile(userFid);
    utilConsoleOnlyDev(response);

    if (response) {
      setProfileData(response);
    }
  };

  const fnGetUserPosts = async () => {
    setLoadingPosts(true);
    const response = await apiGetUserPosts(userFid);
    utilConsoleOnlyDev(response);
    setUserPosts(response);
    setLoadingPosts(false);
  };
  useEffect(() => {
    fnGetProfile();
    // fnGetUserPosts();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-2">
        {/* {profileData &&
        profileData?.map((item: any, index: any) => {
          return (
            <>
              <ProfileCard
                profileisFollower={item?.followedBy}
                profilePfp={item?.pfp}
                profileFollowing={item?.following}
                profileFollowers={item?.followers}
                profileDisplayName={item?.name}
                profileUsername={item?.username}
                profileBio={item?.bio.text}
              />
            </>
          );
        })} */}

        <Input
          radius="sm"
          type="text"
          label=""
          placeholder="Search Quack"
          labelPlacement="outside"
          startContent={
            <QuackIconSearch width={18} height={18} strokeColor={"#000"} />
          }
        />

        {profileData && (
          <>
            <ProfileCard
              profilePfp={profileData?.pfp}
              profileFollowing={profileData?.following}
              profileFollowers={profileData?.follower}
              profileDisplayName={profileData?.name}
              profileUsername={profileData?.username}
              profileBio={profileData?.bio.text}
            />
          </>
        )}

        <div className="bg-white rounded-md p-2">
          {userPosts &&
            !loadingPosts &&
            userPosts?.map((item: any, index: any) => {
              return (
                <>
                  <PostDetailsCard
                    key={index}
                    postUsername={profileData?.username}
                    postUserFid={profileData?.fid}
                    postUserDisplayName={profileData?.name}
                    postUserPfp={profileData?.pfp}
                    postText={item.body}
                    postImages={item.images}
                    postTimestamp={item.timestamp}
                    postLikes={item?.reaction?.LIKE}
                    postRecasts={item.reaction?.RECAST}
                    postHash={item.hash}
                    postShares={item.shares}
                    postReplies={item.replies}
                    postComments={item.comments}
                    postBookmarks={item.bookmarks}
                    // isLast={index === feedData.length - 1}
                    // newLimit={() => setCursor(apiResponse?.cursor)}
                  />
                </>
              );
            })}
        </div>
        {loadingPosts && (
          <p>
            <Spinner color="default" />
          </p>
        )}
      </div>
    </>
  );
}
