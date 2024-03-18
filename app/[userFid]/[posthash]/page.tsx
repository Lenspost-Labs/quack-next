// README: A page that fetches the post by postHash and userFid

// show the postHash and userFid in the page

export default function PostPage({
  params,
}: {
  params: { postHash: string; userFid: string };
}) {
  console.log(params); // Check if params are received correctly
  const { postHash, userFid } = params;

  return (
    <>
      {postHash} by {userFid}
    </>
  );
}
