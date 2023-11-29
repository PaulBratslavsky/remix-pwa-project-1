import qs from "qs";

import YouTubePlayer from "~/components/YouTubePlayer";

import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Page, Navbar, Card, Button } from "konsta/react";

import BackButton from "~/components/BackButton";
import { getStrapiURL } from "~/utils/api-helpers";

const query = qs.stringify({
  fields: ["title", "description", "videoUrl"],
  populate: {
    user_bio: {
      fields: ["name", "belt"],
      populate: {
        image: {
          fields: ["url", "alternativeText"],
        },
      },
    },
  },
});

export async function loader({ params }: LoaderFunctionArgs) {
  const lessonId = params.lessonId;
  const strapiUrl = getStrapiURL();
  const url =
    (strapiUrl || "http://localhost:1337") +
    "/api/lessons/" +
    lessonId +
    "?" +
    query;
  const res = await fetch(url);
  const data = await res.json();
  return json({ ...data, strapiUrl });
}

export default function LessonDynamicRoute() {
  const loaderData = useLoaderData<typeof loader>();

  const lesson = loaderData.data;
  const strapiUrl = loaderData.strapiUrl;

  return (
    <Page>
      <Navbar title="Single Lessons" right={<BackButton />} />
      <LessonDetail lesson={lesson} strapiUrl={strapiUrl} />
    </Page>
  );
}

function LessonDetail({
  lesson,
  strapiUrl,
}: {
  readonly lesson: any;
  readonly strapiUrl: string;
}) {
  if (!lesson) return null;
  return (
    <Card
      outline
      footer={
        <div className="flex justify-between material:hidden">
          <Button rounded inline>
            Like
          </Button>
        </div>
      }
    >
      <YouTubePlayer
        key={lesson.id}
        playerKey={lesson.id}
        url={lesson.attributes.videoUrl}
      />

      <h1> {lesson.attributes.title}</h1>
      <div className="text-gray-500 mt-6 mb-3">Posted on January 21, 2021</div>
      <p>{lesson.attributes.description}</p>
    </Card>
  );
}
