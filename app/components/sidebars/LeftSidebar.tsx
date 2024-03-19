"use client";
// README : This file contains the LeftSidebar component

import LeftSidebarItem from "@/app/components/sidebars/LeftSidebarItem/LeftSidebarItem";
import { CustomLoginBtn } from "../buttons";
import {
  QuackIconBookmark,
  QuackIconHome,
  QuackIconNotifications,
  QuackIconProfile,
  QuackIconSearch,
  QuackLogo,
} from "@/app/globals/icons/MainIcons";

export default () => {
  const sidebarItems = [
    {
      propIcon: <QuackIconHome width={18} height={18} strokeColor={"#000"} />,
      propText: "Feed",
      propNavigateTo: "/",
    },
    {
      propIcon: <QuackIconSearch width={18} height={18} strokeColor={"#000"} />,
      propText: "Explore",
      propNavigateTo: "/search",
    },
    {
      propIcon: (
        <QuackIconNotifications width={18} height={18} strokeColor={"#000"} />
      ),
      propText: "Notifications",
      propNavigateTo: "/notifications",
    },

    {
      propIcon: (
        <QuackIconBookmark width={18} height={18} strokeColor={"#000"} />
      ),
      propText: "Bookmarks",
      propNavigateTo: "/Bookmarks",
    },
    {
      propIcon: (
        <QuackIconProfile width={18} height={18} strokeColor={"#000"} />
      ),
      propText: "Profile",
      propNavigateTo: "/profile",
    },
  ];

  return (
    <>
      <div className="flex flex-col p-4">
        <div className="">
          <QuackLogo />
        </div>
        <div className="flex flex-col w-full pt-4">
          {sidebarItems.map((item, index) => {
            return (
              <LeftSidebarItem
                key={index}
                propIcon={item.propIcon}
                propText={item.propText}
                propNavigateTo={item.propNavigateTo}
              />
            );
          })}
        </div>
        <div className="">
          <CustomLoginBtn />
        </div>
      </div>
    </>
  );
};
