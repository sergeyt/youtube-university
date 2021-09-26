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
  maxResults = 100,
}: {
  part?: string;
  accessToken: string;
  maxResults?: number;
}) {
  const http = makeClient(accessToken);
  const resp = await http.get(
    "https://youtube.googleapis.com/youtube/v3/playlists",
    {
      params: {
        part,
        mine: true,
        maxResults,
      },
    }
  );
  return resp.data;
}

export async function getPlaylistItems({
  part = "snippet,contentDetails",
  playlistId,
  accessToken,
  maxResults,
}: {
  part?: string;
  playlistId: string;
  accessToken: string;
  maxResults?: number;
}) {
  const http = makeClient(accessToken);
  const resp = await http.get(
    "https://youtube.googleapis.com/youtube/v3/playlistItems",
    {
      params: {
        part,
        playlistId,
        maxResults,
      },
    }
  );
  return resp.data;
}
