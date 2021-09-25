import _ from "lodash";
import { useMemo, useState } from "react";
import { HStack, Stack, VStack, Box, Heading, Text } from "@chakra-ui/react";
import YouTube from "react-youtube";

type Props = {
  data: Course;
};

const CourseView: React.FC<Props> = ({ data }) => {
  const totalDuration = useMemo(
    () => _.sumBy(data.lessons, (t) => t.duration),
    [data]
  );
  const [selectedLesson, setSelectedLesson] = useState(0);

  return (
    <Stack>
      <Heading size="md">{data.title}</Heading>
      <HStack>
        <Box>
          <YouTube videoId={data.lessons[selectedLesson].youtubeVideoId} />
        </Box>
        {/* lesson list */}
        <Box h="100%" overflow="auto">
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
