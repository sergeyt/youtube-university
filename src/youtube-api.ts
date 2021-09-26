import axios from "axios";

function makeClient(accessToken: string) {
  return axios.create({
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export async function getPlaylists({
  part = "snippet,contentDetails",
  accessToken,
}: {
  part?: string;
  accessToken: string;
}) {
  const http = makeClient(accessToken);
  const resp = await http.get(
    "https://youtube.googleapis.com/youtube/v3/playlists",
    {
      params: {
        part,
        mine: true,
        maxResults: 25,
      },
    }
  );
  return resp.data;
}

export async function getPlaylistItems({
  part = "snippet,contentDetails",
  playlistId,
  accessToken,
}: {
  part?: string;
  playlistId: string;
  accessToken: string;
}) {
  const http = makeClient(accessToken);
  const resp = await http.get(
    "https://youtube.googleapis.com/youtube/v3/playlistItems",
    {
      params: {
        part,
        playlistId,
        maxResults: 25,
      },
    }
  );
  return resp.data;
}
