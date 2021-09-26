import _ from "lodash";
import Link from "next/link";
import { Box } from "@chakra-ui/react";
import useSWR from "swr";
import { getPlaylists } from "youtube-api";
import { useAccessToken } from "components/GoogleAuth";
import ErrorView from "./ErrorView";
import Loader from "./Loader";

const YouTubePlaylists = () => {
  const accessToken = useAccessToken();
  const { data, error } = useSWR(
    `/playlists?token=${accessToken}`,
    async () => {
      if (!accessToken) {
        return [];
      }
      const resp = await getPlaylists({
        accessToken,
      });
      return resp.items.map((t) => ({
        id: t.id,
        title: t.snippet.title,
        description: t.snippet.description,
      }));
    }
  );
  return (
    <>
      <ErrorView error={error} />
      {!error && !data && <Loader />}
      {!error && data && _.isEmpty(data) ? (
        <Box m={3}>
          No data. Please login into your google account to view your video
          courses
        </Box>
      ) : null}
      {_.map(data, (item, k) => (
        <Box key={k}>
          <Link href={`/course/youtube/${item.id}`}>{item.title}</Link>
        </Box>
      ))}
    </>
  );
};

export default YouTubePlaylists;
