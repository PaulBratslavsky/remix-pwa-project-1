import qs from "qs";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getStrapiURL } from "~/utils/api-helpers";

import { Page, Navbar } from "konsta/react";
import BackButton from "~/components/BackButton";
import TopicsList from "~/components/TopicsList";

const query = qs.stringify({
  fields: ["title", "description", "createdAt"],
  populate: {
    user_bio: { fields: ["name", "belt"] },
  },
});

export async function loader() {
  const strapiUrl = getStrapiURL();
  const url = (strapiUrl || "http://localhost:1337") + "/api/topics?" + query;
  const res = await fetch(url);
  const data = await res.json();
  return json({ ...data, strapiUrl });
}

export default function ForumRoute() {
  const loaderData = useLoaderData<typeof loader>();
  const topics = loaderData.data;

  return (
    <Page>
      <Navbar title="Forum" right={<BackButton />} />
      <TopicsList topics={topics} />
    </Page>
  );
}
