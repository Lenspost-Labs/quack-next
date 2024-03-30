import Link from "next/link";
import { usePathname } from "next/navigation";

const LeftSidebarItem = ({
  propIcon,
  propText,
  propNavigateTo,
}: {
  propIcon: any;
  propText: string;
  propNavigateTo: string;
}) => {
  const pathname = usePathname();

  return (
    <>
      <Link href={propNavigateTo} className="cursor-pointer">
        <div
          className={`flex flex-row justify-start text-center align-middle items-center gap-4 p-4 cursor-pointer hover:bg-[#f7efe2] rounded-md`}
        >
          <div
            className={` ${
              pathname === propNavigateTo ? "text-[#F2AE40]" : ""
            } w-4 h-4`}
          >
            {propIcon}
          </div>

          <div
            className={`${pathname === propNavigateTo ? "text-[#F2AE40]" : ""}`}
          >
            {propText}
          </div>
        </div>
      </Link>
    </>
  );
};

export default LeftSidebarItem;
