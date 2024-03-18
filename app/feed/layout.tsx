import DesktopLayout from "../layouts/DesktopLayout";

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DesktopLayout>{children}</DesktopLayout>
    </>
  );
}
