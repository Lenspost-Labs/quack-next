// README: A page that fetches the post by postHash and userFid
"use client";

import PostDetailsCard from "@/app/components/cards/PostDetailsCard";

// show the postHash and userFid in the page

export default function PostPage({
  params,
}: {
  params: { userFid: string; postHash: string };
}) {
  console.log(params); // Check if params are received correctly
  const { userFid, postHash } = params;

  return (
    <>
      {/* <PostDetailsCard
        postHash={postHash}
        postUserFid={userFid}
        key={postHash}
        postUsername="frogie.sol"
        postUserDisplayName="Krutarth Shah"
        postText="I could write a thesis on the 5 stages of grief just by watching eth maxis on my timeline."
        postImages={[]}
        postTimestamp={new Date().toISOString()}
        postUserPfp="https://i.pravatar.cc/300"
        postLikes={"21"}
        postRecasts={"1.2K"}
        postShares={"1.2K"}
        postReplies={"6.2K"}
        postComments={"1.2K"}
        postBookmarks={"1.2K"}
      /> */}
      {postHash} x {userFid}
    </>
  );
}
