import qs from "qs";

import YouTubePlayer from "~/components/YouTubePlayer";

import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Page, Navbar, Block, BlockTitle, BlockFooter } from "konsta/react";

import BackButton from "~/components/BackButton";
import { getStrapiURL, flattenAttributes } from "~/utils/api-helpers";
import RichText from "~/components/RichText";

const query = qs.stringify({
  fields: ["id", "heading", "content", "videoUrl", "richtext", "createdAt"],
  populate: {
    userBio: {
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
  const url = strapiUrl + "/api/contents/" + lessonId + "?" + query;
  const res = await fetch(url);
  const data = await res.json();
  const flattenedData = flattenAttributes(data);
  console.log(flattenedData, "flattenedData");
  return json({ ...flattenedData, strapiUrl });
}

export default function LessonDynamicRoute() {
  const loaderData = useLoaderData<typeof loader>();
  const lesson = loaderData;

  return (
    <Page className="bg-white pb-24">
      <Navbar
        title={lesson.heading.slice(0, 34) + "..."}
        right={<BackButton />}
      />

      <YouTubePlayer
        key={lesson.id}
        playerKey={lesson.id}
        url={lesson.videoUrl}
        className="-my-5.75 sticky top-5 z-50"
      />
      <BlockTitle className="text-2xl font-bold mb-4">{lesson.heading}</BlockTitle>
      <BlockFooter className="text-gray-500 mt-6 mb-3">
        Posted on January 21, 2021
      </BlockFooter>
      <Block>
        <p>{lesson.content}</p>
      </Block>
      <Block>
        <RichText content={lesson.richtext} />
      </Block>
    </Page>
  );
}
