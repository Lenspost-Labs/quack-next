// ---------
// README : This file contains the DesktopLayout component which is used to render the layout for the desktop view of the application.
// It is used to render the left sidebar, right sidebar and the main content of the application
// It takes children as props which is the main content of the application
// ---------

import { LeftSidebar, RightSidebar } from "@/app/components/sidebars";

const DesktopLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-row h-[100vh] lg:justify-center gap-4 lg:px-16 sm:p-0 sm:justify-between ">
      {/* Left Part */}
      <div className="md:max-w-[240px]">
        <LeftSidebar />
      </div>

      {/* Center - Dynamic */}
      <div className="w-2/4 overflow-y-auto overflow-x-hidden  ">
        {children}
      </div>

      {/* Right Part */}
      <div className="md:max-w-[240px]">
        <RightSidebar />
      </div>
    </div>
  );
};

export default DesktopLayout;
