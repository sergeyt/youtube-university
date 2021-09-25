type Lesson = {
  title: string;
  description: string;
  duration: number;
  youtubeVideoId: string;
};

type Course = {
  title: string;
  description: string;
  lessons: Lesson[];
};
