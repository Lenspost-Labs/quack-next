// README: A page that fetches the post by postHash and userFid
"use client";

import PostDetailsCard from "@/app/components/cards/PostDetailsCard";
import { apiGetPostDetails } from "@/app/server";
import { utilConsoleOnlyDev } from "@/app/utils";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// show the postHash and userFid in the page

export default function PostPage({
  params,
}: {
  params: { userFid: string; postHash: any };
}) {
  console.log(params); // Check if params are received correctly
  const { userFid, postHash } = params;
  const pathname = usePathname();

  // /sfsds/fsfs
  // Extract the second part of the pathname
  const pathnameParts = pathname.split("/");
  const postHashFromPathname = pathnameParts[pathnameParts.length - 1];
  utilConsoleOnlyDev(`postHash from pathname: ${postHashFromPathname}`);

  const [postData, setPostData] = useState<any>();

  const fnGetPostDetails = async () => {
    const res = await apiGetPostDetails({
      fid: Number(userFid),
      hash: postHashFromPathname,
    });

    utilConsoleOnlyDev(res);
    setPostData(res);
  };

  useEffect(() => {
    utilConsoleOnlyDev(
      `userFid and postHash in PostPage: ${userFid} ${postHash}`
    );
    fnGetPostDetails();
  }, [userFid, postHashFromPathname]);

  return (
    <>
      {userFid} x {postHashFromPathname}
    </>
  );
}
