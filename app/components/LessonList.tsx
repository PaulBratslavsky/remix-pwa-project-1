import { List, ListItem } from "konsta/react";
import { getStrapiMedia } from "~/utils/api-helpers";

function LessonItem({ lesson, strapiUrl }: { lesson: any, strapiUrl: string }) {
  const user = lesson.attributes.user_bio.data;
  const name = user.attributes.name;
  const belt = user.attributes.belt.toLowerCase();
  const image = user.attributes.image.data.attributes.url;
  const alt = user.attributes.image.data.attributes.alternativeText;
  const imageUrl = getStrapiMedia(image, strapiUrl);
  const fullImageUrl = imageUrl ? imageUrl : "https://picsum.photos/200";


  return (
    <ListItem
      link
      chevronMaterial={false}
      title={lesson.attributes.title}
      after="beginner"
      subtitle={name + " - " + belt + " belt"}
      text={lesson.attributes.description.slice(0, 144) + "..."}
      media={
        <img
          className="ios:rounded-lg material:rounded-full ios:w-20 material:w-10"
          src={fullImageUrl as string}
          width="80"
          alt={alt || "user image"}
        />
      }
    />
  );
}

export default function LessonList({ lessons, strapiUrl }: { lessons: any, strapiUrl: string }) {
  if (!lessons) return null;
  return (
    <List strongIos outlineIos>
      {lessons.map(( lesson: any ) => (
        <LessonItem key={lesson.id} lesson={lesson} strapiUrl={strapiUrl} />
      ))}
    </List>
  );
}
