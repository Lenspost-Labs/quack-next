"use client";

import { useEffect, useState } from "react";
import { apiGetFeed } from "../server";
import { utilConsoleOnlyDev } from "../utils";
import PostDetailsCard from "../components/cards/PostDetailsCard";

export default function FeedPage() {
  const [feedData, setFeedData] = useState<any>([]);
  const [cursor, setCursor] = useState<any>("");
  const [apiResponse, setApiResponse] = useState<any>(null);

  const fnGetFeed = async () => {
    const response = await apiGetFeed(cursor);
    utilConsoleOnlyDev(response);

    // if (response) {

    setApiResponse(response);
    setFeedData((prev: any) => [...prev, ...response?.feed]);

    // }
  };

  useEffect(() => {
    fnGetFeed();
  }, [cursor]);

  useEffect(() => {
    fnGetFeed();
  }, []);

  return (
    <>
      <div className="">
        {feedData &&
          feedData?.map((item: any, index: any) => {
            return (
              <>
                <PostDetailsCard
                  key={index}
                  postUsername={item?.author?.username}
                  postUserFid={item?.author?.fid}
                  postUserDisplayName={item?.author?.name}
                  postUserPfp={item?.author?.pfp}
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
                  postFrameUrl={item.embeds[0].url}
                  isLast={index === feedData.length - 1}
                  newLimit={() => setCursor(apiResponse?.cursor)}
                />
              </>
            );
          })}
      </div>
    </>
  );
}
