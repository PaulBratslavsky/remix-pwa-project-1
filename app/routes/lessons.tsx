import qs from "qs"

import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Page, Navbar } from "konsta/react";

import BackButton from "~/components/BackButton";
import LessonList from "~/components/LessonList";
import { getStrapiURL } from "~/utils/api-helpers";

const query = qs.stringify({
  fields: ["title", "description"],
  populate: {
    user_bio: {
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
  const url = (strapiUrl || "http://localhost:1337") + "/api/lessons?" + query;
  const res = await fetch(url);
  const data = await res.json();
  return json({...data, strapiUrl });
}

export default function LessonsRoute() {
  const loaderData = useLoaderData<typeof loader>();

  const lessons = loaderData.data;
  const meta = loaderData.meta;
  const pageCount = meta?.pagination.pageCount;
  const strapiUrl = loaderData.strapiUrl;

  console.log(lessons);
  console.log(meta);
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
