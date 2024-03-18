// README : This file contains the utility function to console.log only on DEV mode - eliminating console.log on PRODUCTION

export const utilConsoleOnlyDev = (message: string) => {
  if (process.env.NODE_ENV === "development") {
    console.log(message);
  }
};
