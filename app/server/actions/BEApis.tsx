"use client";

import {
  quackGetRequest,
  quackPostRequest,
} from "@/app/server/actions/BEQuackActions";

export async function apiLoginStep1({
  signature,
  message,
  solana_address,
}: {
  signature: any;
  message: string;
  solana_address: any;
}) {
  const response = await quackPostRequest({
    path: "/auth",
    data: {
      signature,
      message,
      solana_address,
    },
  });

  return response.json();
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

