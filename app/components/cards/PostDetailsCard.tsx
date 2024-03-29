import {
  QuackIconBookmark,
  QuackIconComment,
  QuackIconExtLink,
  QuackIconLike,
  QuackIconRecast,
  QuackIconShare,
} from "@/app/globals/icons/MainIcons";
import { apiActOnAPost, apiGetOgs, apiReactToPost } from "@/app/server";
import { utilConsoleOnlyDev } from "@/app/utils";
import { utilExtractLinks } from "@/app/utils/functions/utilExtractLinks";
import { utilXtimeAgo } from "@/app/utils/functions/utilXtimeAgo";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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
  postFrameUrl,
}: TypePostDetailsCard) => {
  const postCardRef = useRef<any>();
  const [metadata, setMetadata] = useState<any>({
    fcFrame: "",
    frameImage: "",
    ogImage: "",
    ogTitle: "",
    ogUrl: "",
    ogDescription: "",
    frameButton1: "",
    frameButton1Action: "post", // Default action is 'post'
    frameButton1Target: "",
    frameButton2: "",
    frameButton2Action: "post", // Default action is 'post'
    frameButton2Target: "",
    frameButton3: "",
    frameButton3Action: "post", // Default action is 'post'
    frameButton3Target: "",
    frameButton4: "",
    frameButton4Action: "post", // Default action is 'post'
    frameButton4Target: "",
    framePostUrl: "",
    frameInputText: "",
    frameImageAspectRatio: "1.91:1", // Default aspect ratio is '1.91:1'
    frameState: {},
  });

  const fnReactToPost = async (rxnType: string) => {
    const response = await apiReactToPost({
      fid: Number(postUserFid),
      hash: postHash,
      reaction: 1,
      type: 1,
    });

    utilConsoleOnlyDev(response);
  };
  const fetchDataAndSetMetadata = async () => {
    try {
      const response = await apiGetOgs(postFrameUrl);

      if (response) {
        const {
          "og:image": ogImage,
          "og:title": ogTitle,
          "og:description": ogDescription,
          "og:url": ogUrl,
          "fc:frame": fcFrame,
          "fc:frame:image": frameImage,
          "fc:frame:image:aspect_ratio": frameImageAspectRatio,
          "fc:frame:post_url": framePostUrl,
          "fc:frame:button:1": frameButton1,
          "fc:frame:button:2": frameButton2,
          "fc:frame:button:3": frameButton3,
          "fc:frame:button:4": frameButton4,
          "fc:frame:button:1:action": frameButton1Action,
          "fc:frame:button:1:target": frameButton1Target,
          "fc:frame:button:2:action": frameButton2Action,
          "fc:frame:button:2:target": frameButton2Target,
          "fc:frame:button:3:action": frameButton3Action,
          "fc:frame:button:3:target": frameButton3Target,
          "fc:frame:button:4:action": frameButton4Action,
          "fc:frame:button:4:target": frameButton4Target,
          "fc:frame:state": frameState,
        } = response;

        setMetadata({
          ogImage,
          ogTitle,
          ogDescription,
          ogUrl,
          frameImage,
          frameImageAspectRatio,
          fcFrame,
          frameButton1,
          frameButton1Action,
          frameButton1Target,
          frameButton2, // Include missing properties
          frameButton2Action,
          frameButton2Target,
          frameButton3,
          frameButton3Action,
          frameButton3Target,
          frameButton4,
          frameButton4Action,
          frameButton4Target,
          framePostUrl,
          frameInputText: "",
          frameState,
        });
      }
    } catch (error) {
      console.error("Error fetching OG data:", error);
      // Handle error appropriately
    }
  };

  // OG Fetching & Frame Interactions
  useEffect(() => {
    if (!postFrameUrl) {
      return;
    }
    if (postFrameUrl !== null) {
      fetchDataAndSetMetadata();
    }
  }, [postFrameUrl]);

  /**
   * Handle button click event
   * @param evt - The click event
   * @param btnAction - Specifies if the button action is post_redirect or link
   * @param index - The index of the button
   * @returns void
   */
  const handleButtonClick = async (
    evt: React.MouseEvent,
    btnAction: "post_redirect" | "link",
    index: number
  ): Promise<void> => {
    evt.preventDefault();

    try {
      if (btnAction === "post_redirect" || btnAction === "link") {
        window.open(postFrameUrl, "_blank");
        return;
      }
      const btnHitRes = await apiActOnAPost({
        hash: postHash,
        fid: Number(postUserFid),
        buttonIndex: index,
        url: postFrameUrl,
      });

      console.log("btnHitRes", btnHitRes);
      // Define an interface for the meta tags

      // Assuming btnHitRes is HTML response, parse it to extract meta tags
      const parser = new DOMParser();
      const htmlDoc = parser.parseFromString(
        btnHitRes?.data?.data,
        "text/html"
      );

      // Extract meta tags from the parsed HTML
      const metaTags = Array.from(htmlDoc.querySelectorAll("meta")).reduce(
        (acc: any, meta: any) => {
          const name = meta.getAttribute("name");
          const property = meta.getAttribute("property");
          const content = meta.getAttribute("content");

          if (name !== null) {
            acc[name] = content;
          } else if (property !== null) {
            acc[property] = content;
          }

          return acc;
        },
        {}
      ) as any;

      // Set metadata based on the extracted meta tags
      setMetadata({
        fcFrame: metaTags["fc:frame"] || "",
        frameImage: metaTags["fc:frame:image"] || metaTags["og:image"] || "",
        ogImage: metaTags["og:image"] || "",
        ogTitle: metaTags["og:title"] || "",
        ogUrl: metaTags["og:url"] || "",
        ogDescription: metaTags["og:description"] || "",
        frameButton1: metaTags["fc:frame:button:1"] || "",
        frameButton1Action: metaTags["fc:frame:button:1:action"] || "post",
        frameButton1Target: metaTags["fc:frame:button:1:target"] || "",
        frameButton2: "", // Add the missing property with an initial value
        frameButton2Action: "", // Add the missing property with an initial value
        frameButton2Target: "", // Add the missing property with an initial value
        frameButton3: "", // Add the missing property with an initial value
        frameButton3Action: "", // Add the missing property with an initial value
        frameButton3Target: "", // Add the missing property with an initial value
        frameButton4: "", // Add the missing property with an initial value
        frameButton4Action: "", // Add the missing property with an initial value
        frameButton4Target: "", // Add the missing property with an initial value
        framePostUrl: metaTags["fc:frame:post_url"] || "",
        frameInputText: "",
        frameImageAspectRatio: metaTags["fc:frame:image:aspect_ratio"] || "",
        // frameState: metaTags["fc:frame:state"] || "",
        frameState: {}, //Empty for now - New update
        // Add the other missing properties here
      });

      console.log("btnHitRes", btnHitRes);
      // message.destroy();
      if (btnHitRes?.data?.message) {
        // message.success(btnHitRes?.data?.message);
      } else {
        // message.info("Frame Action Error");
      }
    } catch (error) {
      console.error("Error handling button click:", error);
      // message.destroy();
      // message.error("Frame Action Error");
      // Handle error appropriately
    }
  };

  return (
    <>
      {/* <Link href={`/${postUserFid}/${postHash}`}> */}
      <div
        className="flex flex-row gap-4 bg-[#fff] border-b-2 p-2 py-4 hover:bg-[#fafafa] cursor-pointer"
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

            {postImages && !metadata.frameImage && (
              <Image
                width={240}
                height={240}
                src={postImages ? postImages[0] : ""}
                alt={metadata.ogTitle}
                className={`w-full p-2 rounded-md aspect-${
                  metadata.frameImageAspectRatio || "1.91:1"
                }
                  `}
              />
            )}

            {metadata?.ogImage &&
              metadata.ogImage !== "" &&
              !metadata.frameImage && (
                <Image
                  width={240}
                  height={240}
                  src={metadata?.ogImage ? metadata.ogImage : ""}
                  alt={metadata.ogTitle}
                  className={`w-full p-2 rounded-md aspect-${
                    metadata.frameImageAspectRatio || "1.91:1"
                  }
                  `}
                />
              )}
            <div className="text-xs text-slate-800 py-2 text-right">
              {" "}
              {metadata?.ogUrl}{" "}
            </div>

            {/* <div className="">{postImages}</div> */}

            {/* Frames Container */}
            {metadata.frameImage && metadata.frameImage !== "" && (
              <div className="m-2 border rounded-md p-2">
                <Image
                  width={240}
                  height={240}
                  src={metadata.frameImage}
                  alt={metadata.ogTitle}
                  className={`w-full p-2 rounded-md aspect-${
                    metadata.frameImageAspectRatio || "1.91:1"
                  }`}
                />
                <h1 className="m-2 border px-2 p-1 text-sm w-fit rounded-md">
                  {metadata.ogTitle}
                </h1>

                {/* Render input field if present */}
                {metadata.frameInputText && (
                  <input type="text" placeholder={metadata.frameInputText} />
                )}

                <div className="flex gap-2 p-2 w-full cursor-pointer">
                  {[1, 2, 3, 4].map((index) => {
                    const buttonData = metadata[`frameButton${index}`];
                    return (
                      buttonData && (
                        <Button
                          variant="bordered"
                          endContent={
                            metadata[`frameButton${index}Action`] ===
                              "post_redirect" ||
                            metadata[`frameButton${index}Action`] === "link" ? (
                              <QuackIconExtLink />
                            ) : null
                          }
                          className="w-full"
                          onClick={(evt) =>
                            handleButtonClick(
                              evt,
                              metadata[`frameButton${index}Action`],
                              index
                            )
                          }
                        >
                          {buttonData}
                        </Button>
                      )
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-row justify-between align-middle items-center gap-4">
            <div className="flex flex-row gap-2 items-center">
              <div className="">
                <QuackIconComment />
              </div>
              <div className="text-[#5B7083]">{postComments}</div>
            </div>

            <div
              onClick={() => fnReactToPost("recast")}
              className="flex flex-row gap-2 items-center"
            >
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
      {/* </Link> */}
    </>
  );
};

export default PostDetailsCard;
