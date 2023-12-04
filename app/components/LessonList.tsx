import { List, ListItem } from "konsta/react";
import { useNavigate } from "@remix-run/react";
import StrapiImage from "./StrapiImage";

interface LessonProps {
  readonly lesson: any;
  readonly strapiUrl: string;
}

interface LessonsProps {
  readonly lessons: any;
  readonly strapiUrl: string;
}

function LessonItem({ lesson, strapiUrl }: LessonProps) {
  const navigate = useNavigate();
  const user = lesson.attributes.user_bio.data;
  const name = user.attributes.name;
  const belt = user.attributes.belt.toLowerCase();
  const image = user.attributes.image.data.attributes.url;
  const alt = user.attributes.image.data.attributes.alternativeText;

  return (
    <ListItem
      link
      chevronMaterial={false}
      title={lesson.attributes.title}
      after="beginner"
      subtitle={name + " - " + belt + " belt"}
      text={lesson.attributes.description.slice(0, 144) + "..."}
      media={<StrapiImage url={image} alt={alt} strapiUrl={strapiUrl} />}
      onClick={() => navigate("/lessons/" + lesson.id)}
    />
  );
}

export default function LessonList({ lessons, strapiUrl }: LessonsProps) {
  if (!lessons) return null;
  return (
    <List strongIos outlineIos className="-mt-1">
      {lessons.map((lesson: any) => (
        <LessonItem key={lesson.id} lesson={lesson} strapiUrl={strapiUrl} />
      ))}
    </List>
  );
}
