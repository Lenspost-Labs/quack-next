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
      <Link href={propNavigateTo}>
        <div
          className={`  ${
            pathname === propNavigateTo ? "bg-slate-300" : ""
          } flex flex-row justify-start text-center items-center gap-4 p-4 bg-slate-200 hover:bg-slate-300`}
        >
          <div className="w-4 h-4">{propIcon}</div>

          <div className="">{propText}</div>
        </div>
      </Link>
    </>
  );
};

export default LeftSidebarItem;
