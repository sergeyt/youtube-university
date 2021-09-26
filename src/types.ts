export type Lesson = {
  title: string;
  description: string;
  duration: number;
  youtubeVideoId: string;
};

export type Course = {
  title: string;
  description: string;
  lessons: Lesson[];
};
