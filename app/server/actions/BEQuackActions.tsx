import { apiUrl } from "@/app/globals/envGlobals";

// README : This file contains all the API calls - eliminating Axios, using next fetch instead

const BE_URL = apiUrl;

// Auto cached by Next13
// https://nextjs.org/docs/app/api-reference/functions/fetch

export async function quackGetRequest({ path }: { path: string }) {
  const response = await fetch(BE_URL + path);
  const res = await response.json();
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
    body: JSON.stringify({ data }),
  });
  const res = await response.json();
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
    body: JSON.stringify({ data }),
  });
  const res = await response.json();
  return res;
}

export async function quackDeleteRequest({ path }: { path: string }) {
  const response = await fetch(BE_URL + path, {
    method: "DELETE",
  });
  const res = await response.json();
  return res;
}
