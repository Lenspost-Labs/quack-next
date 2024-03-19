"use client";
// README : This file contains the LeftSidebar component

import LeftSidebarItem from "@/app/components/sidebars/LeftSidebarItem/LeftSidebarItem";
import { CustomLoginBtn } from "../buttons";
import { quackIconHome, quackIconProfile } from "@/app/globals/icons/MainIcons";

export default () => {
  const sidebarItems = [
    {
      propIcon: quackIconHome,
      propText: "Feed",
      propNavigateTo: "/",
    },

    {
      propIcon: quackIconProfile,
      propText: "Profile",
      propNavigateTo: "/profile",
    },
  ];

  return (
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

      <CustomLoginBtn />
    </div>
  );
};
