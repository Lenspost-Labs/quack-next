import {
  QuackIconBookmark,
  QuackIconComment,
  QuackIconLike,
  QuackIconRecast,
  QuackIconShare,
} from "@/app/globals/icons/MainIcons";
import { utilXtimeAgo } from "@/app/utils/functions/utilXtimeAgo";
import Image from "next/image";

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
}: TypePostDetailsCard) => {
  return (
    <>
      <div className="flex flex-row gap-4 bg-[#fff] border-b-2 p-2">
        <div className="">
          <Image
            className={"rounded-full object-cover"}
            src={postUserPfp}
            width={48}
            height={48}
            alt=""
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-2">
            <div className="">{postUserDisplayName}</div>
            <div className="text-[#787878]">@{postUsername}</div>
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
