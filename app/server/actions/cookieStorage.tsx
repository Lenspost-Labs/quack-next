"use server";

//Reference : https://nextjs.org/docs/app/api-reference/consts/cookies

import { cookies } from "next/headers";

const cookieStore = cookies();

export const quackGetCookie = (cookie: string) => {
  return cookieStore.get(cookie);
};

export const quackGetAllCookies = () => {
  return cookieStore.getAll();
};
export const quackSetCookie = (cookie: string, value: string) => {
  cookieStore.set(cookie, value, { path: "/" });
};

export const quackRemoveCookie = (cookie: string) => {
  cookieStore.delete(cookie);
};

export const quackSetCookieWithExpiry = (
  cookie: string,
  value: string,
  expiry: Date
) => {
  cookieStore.set(cookie, value, {
    path: "/",
    expires: expiry,
  });
};

// ***
// TODO : best practice for the future - quackGetCookie / appGetCookie - function name convention
// ***
