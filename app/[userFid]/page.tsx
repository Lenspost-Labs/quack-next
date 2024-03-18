

export default function UserProfilePage({
  params,
}: {
  params: { userFid: string };
}) {
  const { userFid } = params;

  return (
    <>
      User Profile : {userFid}
    </>
  );
}
