// -----------------------------------------------
// Environment Variables that are available Global
// -----------------------------------------------

export const isDev = process.env.NODE_ENV === "development";
export const isProd = process.env.NODE_ENV === "production";
export const isTest = process.env.NODE_ENV === "test";
export const isBrowser = typeof window !== "undefined";
export const isServer = !isBrowser;
export const isClient = isBrowser;
export const isServerless = isServer && !isDev;
export const isDevServer = isServer && isDev;
export const isProdServer = isServer && isProd;
export const isTestServer = isServer && isTest;
export const isDevClient = isClient && isDev;
export const isProdClient = isClient && isProd;
export const isTestClient = isClient && isTest;

// -----------------------------------------------
// Environment Variables for the App
// -----------------------------------------------

export const environment = "development";
export const baseUrl = process.env.BASE_URL;
export const BE_LOCAL_URL = process.env.BE_LOCAL_URL;
export const BE_DEV_URL = process.env.BE_DEV_URL;
export const BE_PROD_URL = process.env.BE_PROD_URL;
export const apiUrl = environment === "development" ? BE_DEV_URL : BE_PROD_URL;
