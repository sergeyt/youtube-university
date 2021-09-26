import _ from "lodash";
import { useMemo, useState } from "react";
import {
  HStack,
  Stack,
  Box,
  Heading,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import Player from "react-player";
import YouTube from "react-youtube";
import { Course, Lesson } from "types";

type Props = {
  data: Course;
};

const CourseView: React.FC<Props> = ({ data }) => {
  const totalDuration = useMemo(
    () => _.sumBy(data.lessons, (t) => t.duration),
    [data]
  );
  const [selectedLesson, setSelectedLesson] = useState(0);
  const lesson = data.lessons[selectedLesson];

  return (
    <Stack>
      <Heading size="md">{data.title || lesson?.title}</Heading>
      <HStack>
        <Box h="380px">
          {lesson?.youtubeVideoId ? (
            <YouTube videoId={lesson.youtubeVideoId} />
          ) : null}
          {lesson?.videoUrl ? <Player url={lesson.videoUrl} /> : null}
        </Box>
        {/* lesson list */}
        <Box h="380px" overflow="auto">
          <Stack>
            <Heading size="xs">
              {data.lessons.length} lessons ({_.round(totalDuration)}min)
            </Heading>
            {data.lessons.map((lesson, k) => (
              <LessonItem
                key={k}
                index={k}
                data={lesson}
                isSelected={selectedLesson === k}
                onClick={() => setSelectedLesson(k)}
              />
            ))}
          </Stack>
        </Box>
      </HStack>
      <Tabs>
        <TabList>
          <Tab>About Lesson</Tab>
          <Tab>About</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>{lesson.description}</TabPanel>
          <TabPanel>{data.description}</TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  );
};

export default CourseView;

function LessonItem({
  data,
  index,
  isSelected,
  onClick,
}: {
  data: Lesson;
  index: number;
  isSelected: boolean;
  onClick: VoidFunction;
}) {
  return (
    <HStack
      cursor="pointer"
      bg={isSelected ? "blue.100" : undefined}
      onClick={onClick}
    >
      <Box></Box>
      <Box>
        <Text fontWeight="bold">
          {index + 1}.&nbsp;{data.title}
        </Text>
      </Box>
      <Box>
        <Text>{data.duration}min</Text>
      </Box>
    </HStack>
  );
}
