import { useRouter } from "next/router";
import CourseView from "components/CourseView";
import { useAccessToken } from "components/GoogleAuth";
import ErrorView from "components/ErrorView";
import useSWR from "swr";
import { getPlaylistItems } from "youtube-api";

export default function CoursePage() {
  const router = useRouter();
  const { pid } = router.query;
  const accessToken = useAccessToken();
  const { data, error } = useSWR(`/course?token=${accessToken}`, async () => {
    if (!accessToken) {
      throw new Error("no access token");
    }
    const resp = await getPlaylistItems({
      playlistId: String(pid),
      accessToken,
    });
    return {
      title: "",
      description: "",
      lessons: resp.items.map((t) => ({
        title: t.snippet.title,
        description: t.snippet.description,
        duration: 5,
        youtubeVideoId: t.contentDetails.videoId,
      })),
    } as Course;
  });

  return (
    <>
      <ErrorView error={error} />
      {data ? <CourseView data={data} /> : null}
    </>
  );
}
