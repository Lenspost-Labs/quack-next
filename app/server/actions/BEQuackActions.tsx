"use client";
// README : This file contains all the API trigger functions - eliminating Axios, using next fetch instead
import { useEffect } from "react";

const BE_URL = "https://api.quack.fun";

let jwtToken;
if (typeof window !== "undefined") {
  jwtToken = localStorage.getItem("jwtToken");
}

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${jwtToken}`,
};

//GET Auto cached by Next13
// https://nextjs.org/docs/app/api-reference/functions/fetch

export async function quackGetRequest({ path }: { path: string }) {
  const response = await fetch(BE_URL + path, {
    method: "GET",
    headers,
  });
  const res = await response.json();
  if (res.message) {
    if (res.message.toLowerCase() === "unauthorized") {
      return null;
    }
  }
  return res;
}

export async function quackPostRequest({
  path,
  data,
}: {
  path: string;
  data: Object;
}) {
  const response = await fetch(BE_URL + path, {
    method: "POST",
    body: JSON.stringify(data),
    headers,
  });
  const res = await response.json();
  if (res.message) {
    if (res.message.toLowerCase() === "unauthorized") {
      return null;
    }
  }
  return res;
}

export async function quackPutRequest({
  path,
  data,
}: {
  path: string;
  data: Object;
}) {
  const response = await fetch(BE_URL + path, {
    method: "PUT",
    body: JSON.stringify(data),
    headers,
  });
  const res = await response.json();
  if (res.message) {
    if (res.message.toLowerCase() === "unauthorized") {
      return null;
    }
  }
  return res;
}

export async function quackDeleteRequest({ path }: { path: string }) {
  const response = await fetch(BE_URL + path, {
    method: "DELETE",
    headers,
  });
  const res = await response.json();
  if (res.message) {
    if (res.message.toLowerCase() === "unauthorized") {
      return null;
    }
  }
  return res;
}
