import qs from "qs"

import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Page, Navbar } from "konsta/react";
import { flattenAttributes, getStrapiURL } from "~/utils/api-helpers";
import BackButton from "~/components/BackButton";
import LessonList from "~/components/LessonList";

const query = qs.stringify({
  filters: { type: "LESSON", isPublic: true },
  fields: ["id", "heading", "content", "videoUrl", "richtext", "createdAt"],
  populate: {
    userBio: {
        fields: ["name", "belt"],
        populate: {
          image: {
            fields: ["url", "alternativeText"]
          }
        }
    }
  },
});

export async function loader() {
  const strapiUrl = getStrapiURL();
  const url = strapiUrl + "/api/contents?" + query;
  const res = await fetch(url);
  const data = await res.json();
  const flattenedData = flattenAttributes(data);
  return json({ ...flattenedData, strapiUrl });
}

export default function LessonsRoute() {
  const loaderData = useLoaderData<typeof loader>();
  const lessons = loaderData.data;
  const meta = loaderData.meta;
  const pageCount = meta?.pagination.pageCount;
  const strapiUrl = loaderData.strapiUrl;

  console.log(pageCount);
  
  // const errors = actionData?.errors;
  // const response = actionData?.data;

  return (
    <Page>
      <Navbar title="Lessons" right={<BackButton />} />
      <LessonList lessons={lessons} strapiUrl={strapiUrl} />
    </Page>
  );
}
