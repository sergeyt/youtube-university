import _ from "lodash";
import Link from "next/link";
import { Box, Stack } from "@chakra-ui/react";
import ErrorView from "components/ErrorView";
import { useAccessToken } from "components/GoogleAuth";
import Page from "components/Layout";
import useSWR from "swr";
import { getPlaylists } from "youtube-api";

export default function Home() {
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
    <Page>
      <Stack>
        <ErrorView error={error} />
        {_.map(data, (item) => (
          <Box>
            <Link href={`/course/${item.id}`}>{item.title}</Link>
          </Box>
        ))}
      </Stack>
    </Page>
  );
}
