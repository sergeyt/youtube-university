import _ from "lodash";
import {
  Box,
  Stack,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import Page from "components/Layout";
import YouTubePlaylists from "components/YouTubePlaylists";
import UCFileGroups from "components/UploadcareFileGroups";

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

export default function Home({ uploadcare }) {
  return (
    <Page>
      <Stack>
        <Tabs isLazy>
          <TabList>
            <Tab>YouTube</Tab>
            <Tab>UploadCare</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <YouTubePlaylists />
            </TabPanel>
            <TabPanel>
              <UCFileGroups apiConfig={uploadcare} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
    </Page>
  );
}
