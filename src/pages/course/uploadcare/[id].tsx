import _ from "lodash";
import { useRouter } from "next/router";
import CourseView from "components/CourseView";
import ErrorView from "components/ErrorView";
import Page from "components/Layout";
import useSWR from "swr";
import { getFileGroup } from "uploadcare-api";
import { Course } from "types";

export async function getStaticPaths() {
  return {
    paths: ["/course/uploadcare/1"],
    fallback: true,
  };
}

export async function getStaticProps() {
  return {
    props: {
      uploadcare: {
        publicKey: process.env.UC_PUBLIC_KEY,
        secretKey: process.env.UC_SECRET_KEY,
      },
    },
  };
}

export default function CoursePage({ uploadcare }) {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(`/uploadcare/file-group/${id}`, async () => {
    const grp = await getFileGroup(String(id), uploadcare);
    return {
      title: grp.title || grp.id,
      description: grp.description || "",
      lessons: _.map(grp.items, (t) => ({
        title: t.snippet.title,
        description: t.snippet.description,
        duration: 5,
        youtubeVideoId: t.contentDetails.videoId,
      })),
    } as Course;
  });

  return (
    <Page>
      <ErrorView error={error} />
      {data ? <CourseView data={data} /> : null}
    </Page>
  );
}
