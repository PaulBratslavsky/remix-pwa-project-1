import { List, ListItem } from "konsta/react";
import { useNavigate } from "@remix-run/react";
import StrapiImage from "./StrapiImage";

interface LessonProps {
  id: number;
  heading: string;
  content: string;
  richtext: string;
  public: boolean;
  createdAt: string;
  userBio: {
    id: number;
    name: string;
    belt: string;
    image: {
      url: string;
      alternativeText: string;
    };
  };
}

interface LessonsProps {
  readonly lessons: LessonProps[];
  readonly strapiUrl: string;
}

function LessonItem({
  lesson,
  strapiUrl,
}: {
  lesson: Readonly<LessonProps>;
  strapiUrl: string;
}) {
  const navigate = useNavigate();
  const user = lesson.userBio;
  const name = user.name;
  const belt = user.belt.toLowerCase();
  const image = user.image.url;
  const alt = user.image.alternativeText;

  return (
    <ListItem
      link
      chevronMaterial={false}
      title={lesson.heading}
      after="beginner"
      subtitle={name + " - " + belt + " belt"}
      text={lesson.content.slice(0, 144) + "..."}
      media={<StrapiImage url={image} alt={alt} strapiUrl={strapiUrl} />}
      onClick={() => navigate("/lessons/" + lesson.id)}
    />
  );
}

export default function LessonList({ lessons, strapiUrl }: LessonsProps) {
  if (!lessons) return null;
  console.log(strapiUrl, "strapiUrl")
  return (
    <List strongIos outlineIos className="-mt-1">
      {lessons.map((lesson: any) => (
        <LessonItem key={lesson.id} lesson={lesson} strapiUrl={strapiUrl} />
      ))}
    </List>
  );
}
