import { useQuery, gql } from "@apollo/client";

export async function airGetCastsForFid(fid: number) {
  const query = gql`
  query MyQuery($_eq: Identity, $blockchain: EveryBlockchain!) {
    FarcasterCasts(
      input: {filter: {castedBy: {_eq: fc_fid:$fid}, blockchain: ALL}
    ) {
      Cast {
        castedAtTimestamp
        embeds
        fid
        hash
        id
        numberOfLikes
        numberOfRecasts
        numberOfReplies
        parentFid
        parentHash
        parentUrl
        rootParentHash
        rootParentUrl
        url
        text
        frame {
          buttons {
            id
            action
            index
            label
            target
          }
          castedAtTimestamp
          frameHash
          frameUrl
          id
          imageAspectRatio
          imageUrl
          inputText
          postUrl
          state
        }
      }
    }
  }
`;

  return query;
}
