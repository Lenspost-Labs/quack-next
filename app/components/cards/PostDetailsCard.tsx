import {
  QuackIconBookmark,
  QuackIconComment,
  QuackIconLike,
  QuackIconRecast,
  QuackIconShare,
} from "@/app/globals/icons/MainIcons";
import { apiGetOgs } from "@/app/server";
import { utilConsoleOnlyDev } from "@/app/utils";
import { utilExtractLinks } from "@/app/utils/functions/utilExtractLinks";
import { utilXtimeAgo } from "@/app/utils/functions/utilXtimeAgo";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

const PostDetailsCard = ({
  postUsername,
  postUserDisplayName,
  postText,
  postImages,
  postTimestamp,
  postUserPfp,
  postUserFid,
  postHash,
  postLikes,
  postRecasts,
  postShares,
  postReplies,
  postComments,
  postBookmarks,
  newLimit,
  isLast,
}: TypePostDetailsCard) => {
  const postCardRef = useRef<any>();

  const fnFetchOgs = async () => {
    const urls = utilExtractLinks(postText);
    urls.map((url) => {
      utilConsoleOnlyDev(url);
    });

    const response = await apiGetOgs(urls[0]);
    utilConsoleOnlyDev(response);
  };

  useEffect(() => {
    // fnFetchOgs();
  }, [postText]);

  // Refs for Infinite scrolling :
  // https://www.freecodecamp.org/news/how-to-implement-infinite-scroll-in-next-js/

  useEffect(() => {
    if (!postCardRef?.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (isLast && entry.isIntersecting) {
        newLimit();
        observer.unobserve(entry.target);
      }
    });

    observer.observe(postCardRef.current);
  }, [isLast]);

  return (
    <>
      <div
        className="flex flex-row gap-4 bg-[#fff] border-b-2 p-2 py-4 hover:bg-[#fbf8f4] cursor-pointer"
        ref={postCardRef}
      >
        <div className=" max-w-[48px] max-h-[48px] object-cover">
          <Link href={`/${postUserFid}`}>
            <Image
              className={"rounded-full object-cover max-h-[48px] max-w-[48px]"}
              src={postUserPfp}
              width={48}
              height={48}
              alt=""
            />
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-2">
            <div className="">{postUserDisplayName}</div>
            <Link href={`/${postUserFid}`}>
              <div className="text-[#787878] hover:underline">
                @{postUsername}
              </div>
            </Link>
            <div className=" text-[#787878]">
              {" "}
              {utilXtimeAgo(postTimestamp)}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="">{postText}</div>
            <div className="">{postImages}</div>
          </div>

          <div className="flex flex-row justify-between align-middle items-center gap-4">
            <div className="flex flex-row gap-2 items-center">
              <div className="">
                <QuackIconComment />
              </div>
              <div className="text-[#5B7083]">{postComments}</div>
            </div>

            <div className="flex flex-row gap-2 items-center">
              <div className="">
                <QuackIconRecast />
              </div>
              <div className=" text-[#5B7083]">{postRecasts}</div>
            </div>

            <div className="flex flex-row gap-2 items-center">
              <div className="">
                <QuackIconLike />
              </div>
              <div className=" text-[#5B7083]">{postLikes}</div>
            </div>

            <div className="flex flex-row gap-2 items-center">
              <div className="">
                <QuackIconShare />
              </div>
              <div className=" text-[#5B7083]">{postShares}</div>
            </div>

            <div className="flex flex-row gap-2 items-center">
              <div className="">
                <QuackIconBookmark
                  width={18}
                  height={18}
                  strokeWidth={1.5}
                  strokeColor={"#5B7083"}
                />
              </div>
              <div className=" text-[#5B7083]">{postBookmarks}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetailsCard;
