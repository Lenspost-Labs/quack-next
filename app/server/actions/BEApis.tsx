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
