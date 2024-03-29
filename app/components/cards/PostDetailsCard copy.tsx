// import {
//   QuackIconBookmark,
//   QuackIconComment,
//   QuackIconExtLink,
//   QuackIconLike,
//   QuackIconRecast,
//   QuackIconShare,
// } from "@/app/globals/icons/MainIcons";
// import { apiActOnAPost, apiGetOgs, apiReactToPost } from "@/app/server";
// import { utilConsoleOnlyDev } from "@/app/utils";
// import { utilExtractLinks } from "@/app/utils/functions/utilExtractLinks";
// import { utilXtimeAgo } from "@/app/utils/functions/utilXtimeAgo";
// import { Button } from "@nextui-org/react";
// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useRef, useState } from "react";

// const PostDetailsCard = ({
//   postUsername,
//   postUserDisplayName,
//   postText,
//   postImages,
//   postTimestamp,
//   postUserPfp,
//   postUserFid,
//   postHash,
//   postLikes,
//   postRecasts,
//   postShares,
//   postReplies,
//   postComments,
//   postBookmarks,
//   newLimit,
//   isLast,
//   postFrameUrl,
// }: TypePostDetailsCard) => {
//   const postCardRef = useRef<any>();
//   const [ogData, setOgData] = useState({
//     ogImage: "",
//     ogTitle: "",
//     ogDescription: "",
//     frameImage: "",
//     frameButtons: [],
//   });

//   const [metadata, setMetadata] = useState<any>({
//     fcFrame: "",
//     frameImage: "",
//     ogImage: "",
//     ogTitle: "",
//     ogDescription: "",
//     frameButton1: "",
//     frameButton1Action: "post", // Default action is 'post'
//     frameButton1Target: "",
//     frameButton2: "",
//     frameButton2Action: "post", // Default action is 'post'
//     frameButton2Target: "",
//     frameButton3: "",
//     frameButton3Action: "post", // Default action is 'post'
//     frameButton3Target: "",
//     frameButton4: "",
//     frameButton4Action: "post", // Default action is 'post'
//     frameButton4Target: "",
//     framePostUrl: "",
//     frameInputText: "",
//     frameImageAspectRatio: "1.91:1", // Default aspect ratio is '1.91:1'
//     frameState: {},
//   });

//   const fnReactToPost = async (rxnType: string) => {
//     const response = await apiReactToPost({
//       fid: Number(postUserFid),
//       hash: postHash,
//       reaction: 1,
//       type: 1,
//     });

//     utilConsoleOnlyDev(response);
//   };

//   // OG Fetching & Frame Interactions
//   useEffect(() => {
//     const fetchDataAndSetMetadata = async () => {
//       try {
//         const response = await apiGetOgs(postFrameUrl);

//         if (response?.data) {
//           const {
//             "og:image": ogImage,
//             "og:title": ogTitle,
//             "og:description": ogDescription,
//             "fc:frame": fcFrame,
//             "fc:frame:image": frameImage,
//             "fc:frame:image:aspect_ratio": frameImageAspectRatio,
//             "fc:frame:post_url": framePostUrl,
//             "fc:frame:button:1": frameButton1,
//             "fc:frame:button:2": frameButton2,
//             "fc:frame:button:3": frameButton3,
//             "fc:frame:button:4": frameButton4,
//             "fc:frame:button:1:action": frameButton1Action,
//             "fc:frame:button:1:target": frameButton1Target,
//             "fc:frame:button:2:action": frameButton2Action,
//             "fc:frame:button:2:target": frameButton2Target,
//             "fc:frame:button:3:action": frameButton3Action,
//             "fc:frame:button:3:target": frameButton3Target,
//             "fc:frame:button:4:action": frameButton4Action,
//             "fc:frame:button:4:target": frameButton4Target,
//             "fc:frame:state": frameState,
//           } = response.data;

//           setMetadata({
//             ogImage,
//             ogTitle,
//             ogDescription,
//             frameImage,
//             frameImageAspectRatio,
//             fcFrame,
//             frameButton1,
//             frameButton1Action,
//             frameButton1Target,
//             frameButton2,
//             frameButton2Action,
//             frameButton2Target,
//             frameButton3,
//             frameButton3Action,
//             frameButton3Target,
//             frameButton4,
//             frameButton4Action,
//             frameButton4Target,
//             framePostUrl,
//             frameInputText: "",
//             frameState,
//           });
//         }
//       } catch (error) {
//         console.error("Error fetching OG data:", error);
//         // Handle error appropriately
//       }
//     };

//     fetchDataAndSetMetadata();
//   }, [postFrameUrl]);

//   /**
//    * Handle button click event
//    * @param evt - The click event
//    * @param btnAction - Specifies if the button action is post_redirect or link
//    * @param index - The index of the button
//    * @returns void
//    */
//   const handleButtonClick = async (
//     evt: React.MouseEvent,
//     btnAction: "post_redirect" | "link",
//     index: number
//   ): Promise<void> => {
//     evt.preventDefault();

//     try {
//       if (btnAction === "post_redirect" || btnAction === "link") {
//         window.open(utilExtractLinks(postText)[0], "_blank");
//         return;
//       }
//       const btnHitRes = await apiActOnAPost({
//         hash: postHash,
//         fid: Number(postUserFid),
//         buttonIndex: index,
//         url: utilExtractLinks(postText)[0],
//       });

//       console.log("btnHitRes", btnHitRes);

//       // Assuming btnHitRes is HTML response, parse it to extract meta tags
//       const parser = new DOMParser();
//       const htmlDoc = parser.parseFromString(
//         btnHitRes?.data?.data,
//         "text/html"
//       );

//       // Extract meta tags from the parsed HTML
//       const metaTags = Array.from(htmlDoc.querySelectorAll("meta")).reduce(
//         (acc, meta) => {
//           const name = meta.getAttribute("name");
//           const property = meta.getAttribute("property");
//           const content = meta.getAttribute("content");

//           if (name !== null) {
//             acc[name] = content;
//           } else if (property !== null) {
//             acc[property] = content;
//           }

//           return acc;
//         },
//         {}
//       ) as Record<string, string>;

//       // Set metadata based on the extracted meta tags
//       setMetadata({
//         fcFrame: metaTags["fc:frame"] || "",
//         frameImage: metaTags["fc:frame:image"] || metaTags["og:image"] || "",
//         ogImage: metaTags["og:image"] || "",
//         ogTitle: metaTags["og:title"] || "",
//         ogDescription: metaTags["og:description"] || "",
//         frameButton1: metaTags["fc:frame:button:1"] || "",
//         frameButton1Action: metaTags["fc:frame:button:1:action"] || "post",
//         frameButton1Target: metaTags["fc:frame:button:1:target"] || "",
//         frameButton2: "", // Add the missing property with an initial value
//         frameButton2Action: "", // Add the missing property with an initial value
//         frameButton2Target: "", // Add the missing property with an initial value
//         frameButton3: "", // Add the missing property with an initial value
//         frameState: {}, //Empty for now - New update
//         // Add the other missing properties here
//       });

//       console.log("btnHitRes", btnHitRes);
//       // message.destroy();
//       if (btnHitRes?.data?.message) {
//         // message.success(btnHitRes?.data?.message);
//       } else {
//         // message.info("Frame Action Error");
//       }
//     } catch (error) {
//       console.error("Error handling button click:", error);
//       // message.destroy();
//       // message.error("Frame Action Error");
//       // Handle error appropriately
//     }
//   };

//   useEffect(() => {
//     // Clear existing meta tags in the head
//     document.head
//       .querySelectorAll('meta[name^="og:"], meta[name^="fc:"]')
//       .forEach((meta) => {
//         meta.remove();
//       });

//     // Create and append new meta tags
//     const metaTags = [
//       { name: "og:title", content: metadata.ogTitle },
//       { name: "og:description", content: metadata.ogDescription },
//       { name: "og:image", content: metadata.ogImage || metadata.frameImage },
//       { property: "fc:frame", content: metadata.fcFrame },
//       { property: "fc:frame:image", content: metadata.frameImage },
//       { property: "fc:frame:post_url", content: metadata.framePostUrl },
//       { property: "fc:frame:input:text", content: metadata.frameInputText },
//       {
//         property: "fc:frame:image:aspect_ratio",
//         content: metadata.frameImageAspectRatio || "1.91:1",
//       },
//       { property: "fc:frame:button:1", content: metadata.frameButton1 },
//       {
//         property: "fc:frame:button:1:action",
//         content: metadata.frameButton1Action,
//       },
//       {
//         property: "fc:frame:button:1:target",
//         content: metadata.frameButton1Target,
//       },
//       { property: "fc:frame:button:2", content: metadata.frameButton2 },
//       {
//         property: "fc:frame:button:2:action",
//         content: metadata.frameButton2Action,
//       },
//       {
//         property: "fc:frame:button:2:target",
//         content: metadata.frameButton2Target,
//       },
//       { property: "fc:frame:button:3", content: metadata.frameButton3 },
//       {
//         property: "fc:frame:button:3:action",
//         content: metadata.frameButton3Action,
//       },
//       {
//         property: "fc:frame:button:3:target",
//         content: metadata.frameButton3Target,
//       },
//       { property: "fc:frame:button:4", content: metadata.frameButton4 },
//       {
//         property: "fc:frame:button:4:action",
//         content: metadata.frameButton4Action,
//       },
//       {
//         property: "fc:frame:button:4:target",
//         content: metadata.frameButton4Target,
//       },
//       {
//         property: "fc:frame:state",
//         // content: JSON.stringify(metadata.frameState),
//         content: metadata.frameState,
//       },
//     ];

//     console.log("metaTags", metaTags);

//     metaTags.forEach((meta) => {
//       const metaTag = document.createElement("meta");
//       metaTag.name = meta.name || "";
//       metaTag.setAttribute("property", meta.property || ""); // Fix: Use setAttribute to set the 'property' attribute
//       metaTag.content = meta.content;
//       document.head.appendChild(metaTag);
//     });
//   }, [metadata]);

//   // Refs for Infinite scrolling :
//   // https://www.freecodecamp.org/news/how-to-implement-infinite-scroll-in-next-js/
//   useEffect(() => {
//     if (!postCardRef?.current) return;

//     const observer = new IntersectionObserver(([entry]) => {
//       if (isLast && entry.isIntersecting) {
//         newLimit();
//         observer.unobserve(entry.target);
//       }
//     });

//     observer.observe(postCardRef.current);
//   }, [isLast]);

//   return (
//     <>
//       <Link href={`/${postUserFid}/${postHash}`}>
//         <div
//           className="flex flex-row gap-4 bg-[#fff] border-b-2 p-2 py-4 hover:bg-[#fbf8f4] cursor-pointer"
//           ref={postCardRef}
//         >
//           <div className=" max-w-[48px] max-h-[48px] object-cover">
//             <Link href={`/${postUserFid}`}>
//               <Image
//                 className={
//                   "rounded-full object-cover max-h-[48px] max-w-[48px]"
//                 }
//                 src={postUserPfp}
//                 width={48}
//                 height={48}
//                 alt=""
//               />
//             </Link>
//           </div>
//           <div className="flex flex-col gap-4">
//             <div className="flex flex-row gap-2">
//               <div className="">{postUserDisplayName}</div>
//               <Link href={`/${postUserFid}`}>
//                 <div className="text-[#787878] hover:underline">
//                   @{postUsername}
//                 </div>
//               </Link>
//               <div className=" text-[#787878]">
//                 {" "}
//                 {utilXtimeAgo(postTimestamp)}
//               </div>
//             </div>

//             <div className="flex flex-col">
//               <div className="">{postText}</div>
//               <div className="">{postImages}</div>

//               {/* Frames Container */}

//               <div className="m-2 border rounded-md p-2">
//                 <Image
//                   src={metadata.ogImage || metadata.frameImage}
//                   alt={metadata.ogTitle}
//                   className={`w-full p-2 rounded-md aspect-${
//                     metadata.frameImageAspectRatio || "1.91:1"
//                   }`}
//                 />
//                 <h1 className="m-2 border px-2 p-1 text-sm w-fit rounded-md">
//                   {metadata.ogTitle}
//                 </h1>

//                 {/* Render input field if present */}
//                 {metadata.frameInputText && (
//                   <input type="text" placeholder={metadata.frameInputText} />
//                 )}

//                 <div className="flex gap-2 p-2 w-full">
//                   {[1, 2, 3, 4].map((index) => {
//                     const buttonData = metadata[`frameButton${index}`];
//                     return (
//                       buttonData && (
//                         <Button
//                           endContent={
//                             metadata[`frameButton${index}Action`] ===
//                               "post_redirect" ||
//                             metadata[`frameButton${index}Action`] === "link" ? (
//                               <QuackIconExtLink />
//                             ) : null
//                           }
//                           className="w-full"
//                           onClick={(evt) =>
//                             handleButtonClick(
//                               evt,
//                               metadata[`frameButton${index}Action`],
//                               index
//                             )
//                           }
//                         >
//                           {buttonData}
//                         </Button>
//                       )
//                     );
//                   })}
//                 </div>
//               </div>
//             </div>

//             <div className="flex flex-row justify-between align-middle items-center gap-4">
//               <div className="flex flex-row gap-2 items-center">
//                 <div className="">
//                   <QuackIconComment />
//                 </div>
//                 <div className="text-[#5B7083]">{postComments}</div>
//               </div>

//               <div
//                 onClick={() => fnReactToPost("recast")}
//                 className="flex flex-row gap-2 items-center"
//               >
//                 <div className="">
//                   <QuackIconRecast />
//                 </div>
//                 <div className=" text-[#5B7083]">{postRecasts}</div>
//               </div>

//               <div className="flex flex-row gap-2 items-center">
//                 <div className="">
//                   <QuackIconLike />
//                 </div>
//                 <div className=" text-[#5B7083]">{postLikes}</div>
//               </div>

//               <div className="flex flex-row gap-2 items-center">
//                 <div className="">
//                   <QuackIconShare />
//                 </div>
//                 <div className=" text-[#5B7083]">{postShares}</div>
//               </div>

//               <div className="flex flex-row gap-2 items-center">
//                 <div className="">
//                   <QuackIconBookmark
//                     width={18}
//                     height={18}
//                     strokeWidth={1.5}
//                     strokeColor={"#5B7083"}
//                   />
//                 </div>
//                 <div className=" text-[#5B7083]">{postBookmarks}</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Link>
//     </>
//   );
// };

// export default PostDetailsCard;
