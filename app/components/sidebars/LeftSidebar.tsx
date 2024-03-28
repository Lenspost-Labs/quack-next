"use client";
// README : This file contains the LeftSidebar component

import LeftSidebarItem from "@/app/components/sidebars/LeftSidebarItem/LeftSidebarItem";
import { CustomLoginBtn } from "../buttons";
import {
  QuackIconBookmark,
  QuackIconBookmark18,
  QuackIconHome,
  QuackIconNotifications,
  QuackIconProfile,
  QuackIconSearch,
  QuackLogo,
} from "@/app/globals/icons/MainIcons";
import { usePathname } from "next/navigation";

const LeftSidebar = () => {
  const pathname = usePathname();

  const sidebarItems = [
    {
      propIcon: (
        <QuackIconHome
          width={18}
          height={18}
          strokeColor={`${pathname === "/" ? "#F2AE40" : "#000"}`}
          fill={`${pathname === "/" ? "#F2AE40" : "none"}`}
        />
      ),
      propText: "Feed",
      propNavigateTo: "/feed",
    },
    {
      propIcon: (
        <QuackIconSearch
          width={18}
          height={18}
          strokeColor={`${pathname === "/search" ? "#F2AE40" : "#000"}`}
          fill={`${pathname === "/search" ? "#F2AE40" : "none"}`}
        />
      ),
      propText: "Explore",
      propNavigateTo: "/search",
    },
    {
      propIcon: (
        <QuackIconNotifications
          width={18}
          height={18}
          strokeColor={`${pathname === "/notifications" ? "#F2AE40" : "#000"}`}
          fill={`${pathname === "/notifications" ? "#F2AE40" : "none"}`}
        />
      ),
      propText: "Notifications",
      propNavigateTo: "/notifications",
    },

    {
      propIcon: (
        <QuackIconBookmark18
          width={18}
          height={18}
          strokeColor={`${pathname === "/bookmarks" ? "#F2AE40" : "#000"}`}
          fill={`${pathname === "/bookmarks" ? "#F2AE40" : "none"}`}
        />
      ),
      propText: "Bookmarks",
      propNavigateTo: "/bookmarks",
    },
    {
      propIcon: (
        <QuackIconProfile
          width={18}
          height={18}
          strokeColor={`${pathname === "/profile" ? "#F2AE40" : "#000"}`}
          fill={`${pathname === "/profile" ? "#F2AE40" : "none"}`}
        />
      ),
      propText: "Profile",
      propNavigateTo: "/profile",
    },
  ];

  return (
    <>
      <div className="flex flex-col justify-between p-4 h-full">
        <div className="">
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
        </div>
        <div className="">
          <CustomLoginBtn />
        </div>
      </div>
    </>
  );
};

export default LeftSidebar;
