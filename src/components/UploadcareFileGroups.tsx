import _ from "lodash";
import Link from "next/link";
import useSWR from "swr";
import { Box } from "@chakra-ui/react";
import { getFileGroups } from "uploadcare-api";
import ErrorView from "./ErrorView";
import Loader from "./Loader";

const UploadcareFileGroups = ({ apiConfig }) => {
  const { data, error } = useSWR("/uc/file-groups", () =>
    getFileGroups(apiConfig)
  );
  return (
    <>
      <ErrorView error={error} />
      {!error && !data && <Loader />}
      {!error && data && _.isEmpty(data) ? (
        <Box m={3}>You don't have file groups yet.</Box>
      ) : null}
      {_.map(data?.results, (item, k) => {
        const id = item.id.replace("~1", "");
        return (
            <Box key={k}>
              <Link href={`/course/uploadcare/${id}`}>
                {item.title || id}
              </Link>
            </Box>
        );
      })}
    </>
  );
};

export default UploadcareFileGroups;
