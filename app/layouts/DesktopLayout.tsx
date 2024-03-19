// ---------
// README : This file contains the DesktopLayout component which is used to render the layout for the desktop view of the application.
// It is used to render the left sidebar, right sidebar and the main content of the application
// It takes children as props which is the main content of the application
// ---------

import { LeftSidebar, RightSidebar } from "@/app/components/sidebars";

const DesktopLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-row gap-4 md:px-16 sm:px-8 ">
      {/* Left Part */}
      <div className=" w-1/4">
        <LeftSidebar />
      </div>

      {/* Center - Dynamic */}
      <div className="w-2/4 bg-yellow-200">{children}</div>

      {/* Right Part */}
      <div className="w-1/4 bg-blue-200">
        <RightSidebar />
      </div>
    </div>
  );
};

export default DesktopLayout;
