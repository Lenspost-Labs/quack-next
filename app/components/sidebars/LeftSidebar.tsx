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
import { Button, Divider } from "@nextui-org/react";
import { useEffect, useState } from "react";

const LeftSidebar = () => {
  const pathname = usePathname();
  const [hasUserLoggedIn, setHasUserLoggedIn] = useState(false);

  const fnCheckLoggedIn = () => {
    if (
      localStorageFID === null ||
      localStorageFID === undefined ||
      localStorageFID === ""
    ) {
      setHasUserLoggedIn(false);
    } else {
      setHasUserLoggedIn(true);
    }
  };

  const localStorageFID = localStorage.getItem("localFid");

  const sidebarItems = [
    {
      propIcon: (
        <QuackIconHome
          width={18}
          height={18}
          strokeColor={`${pathname === "/feed" ? "#F2AE40" : "#000"}`}
          fill={`${pathname === "/feed" ? "#F2AE40" : "none"}`}
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
          strokeColor={`${
            pathname === `/${localStorageFID}` ? "#F2AE40" : "#000"
          }`}
          fill={`${pathname === `/${localStorageFID}` ? "#F2AE40" : "none"}`}
        />
      ),
      propText: "Profile",
      propNavigateTo: `/${localStorageFID}`,
    },
  ];

  useEffect(() => {
    fnCheckLoggedIn();
  }, []);

  return (
    <>
      <div className="flex flex-col justify-between p-4 h-full">
        <div className="">
          <div className="">
            <QuackLogo />
          </div>
          <Divider className="my-4" />
          <div className="flex flex-col w-full">
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
          <Divider className="my-4" />
        </div>

        <div className="">
          <Divider className="my-4" />
          <Button variant="shadow" className="w-full bg-[#FFCD2C] text-white">
            Quack Quack
          </Button>

          <Divider className="my-4" />

          <CustomLoginBtn hasLoggedIn={hasUserLoggedIn} />
        </div>
      </div>
    </>
  );
};

export default LeftSidebar;
