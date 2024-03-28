"use client";

import {
  quackGetRequest,
  quackPostRequest,
} from "@/app/server/actions/BEQuackActions";

export async function apiLoginStep1({
  message,
  signature,
  solana_address,
}: {
  message: string;
  signature: any;
  solana_address: any;
}) {
  const response = await quackPostRequest({
    path: "/auth",
    data: {
      message,
      signature,
      solana_address,
    },
  });

  return response;
}

export async function apiLoginStep2() {
  const response = await quackGetRequest({
    path: "/auth/register/pay",
  });

  return response;
}

export async function apiLoginStep3({ txSig }: { txSig: string }) {
  const response = await quackPostRequest({
    path: "/auth/register/pay",
    data: {
      txSig: txSig,
    },
  });

  return response;
}

// /user/suggested-username-pfp
export async function apiGetSuggestedUsernames() {
  const response = await quackGetRequest({
    path: "/user/suggested-username-pfp",
  });

  return response;
}

export async function apiCheckUsernameAvailable(username: string) {
  const response = await quackGetRequest({
    path: `/helper/is-username-available?username=${username}`,
  });

  return response;
}

export async function apiGetFeed(cursor: string) {
  const response = await quackGetRequest({
    path: `/user/post/feed?cursor=${cursor}`,
  });
  return response;
}

export async function apiGetOgs(data: string) {
  const response = await quackGetRequest({
    path: `/helper/fetch-og?url=${data}`,
  });
  return response;
}

export async function apiGetProfile(fid: string) {
  const response = await quackGetRequest({
    path: `/user/about?target_fid=${fid}`,
  });
  return response;
}

export async function apiGetUserPosts(fid: string) {
  const response = await quackGetRequest({
    path: `/user/post/for-fid?fid=${fid}`,
  });
  return response;
}

export async function apiReactToPost({
  fid,
  hash,
  reaction,
  type,
}: {
  fid: number;
  hash: string;
  reaction: number;
  type: number;
}) {
  const response = await quackPostRequest({
    path: `/user/post/react`,
    data: {
      fid,
      hash,
      reaction,
      type,
    },
  });
  return response;
}

export async function apiGetSearchUsers(query: string) {
  const response = await quackGetRequest({
    path: `/helper/search-username?q=${query}`,
  });
  return response;
}
