import qs from "qs";
import z from "zod";
import { json, redirect, type MetaFunction } from "@remix-run/node";
import { useState, useEffect } from "react";

import { flattenAttributes, getStrapiURL } from "~/utils/api-helpers";
import { useLoaderData, useActionData } from "@remix-run/react";
import { userme } from "~/api/auth/userme.server";

import { Page, Navbar } from "konsta/react";

import Modal from "~/components/Modal";
import BackButton from "~/components/BackButton";
import CreateTopicForm from "~/components/CreateTopicForm";
import TopicsList from "~/components/TopicsList";
import TopAddButton from "~/components/TopAddButton";

export const meta: MetaFunction = () => {
  return [
    { title: "BJJ & FRIENDS | Forum" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

const query = qs.stringify({
  filters: { type: "POST", isPublic: true},
  fields: ["heading", "content", "createdAt"],
  populate: { userBio: { fields: ["name", "belt"] } },
});

export async function loader() {
  const strapiUrl = getStrapiURL();
  const url = strapiUrl + "/api/contents?" + query;
  const res = await fetch(url);
  const data = await res.json();
  const flattenedData = flattenAttributes(data);
  console.log("flattenedData", flattenedData);
  return json({ ...flattenedData, strapiUrl });
}

export async function action({ request }: { request: Request }) {
  const strapiUrl = getStrapiURL();
  const user = await userme(request);
  if (!user) return redirect("/login");

  const url = strapiUrl + "/api/contents";
  const formData = await request.formData();

  const formSchema = z.object({
    heading: z.string().min(1),
    content: z.string().min(1),
  });

  const validatedFields = formSchema.safeParse({
    heading: String(formData.get("heading")),
    content: String(formData.get("content")),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to create post.",
      data: null,
    };
  }

  const payload = {
    ...validatedFields.data,
    userBio: user.bio.id,
    type: "POST",
    isPublic: true,
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.jwt}`,
    },
    body: JSON.stringify({ data: { ...payload} }),
  });
  const responseData = await response.json();

  return json({
    errors: null,
    message: "Post created successfully.",
    data: responseData,
  });
}

export default function ForumRoute() {
  const [open, setOpen] = useState(false);
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  const errors = actionData?.errors;
  const response = actionData?.data;
  const topics = loaderData.data;

  useEffect(() => {
    if (response !== null) setOpen(false);
  }, [response]);

  console.log("topics", topics);

  return (
    <Page className="pb-16">
      <Navbar title="Forum" right={<BackButton />} />
      <TopAddButton onClick={setOpen} />
      <TopicsList topics={topics} />
      <Modal open={open} setOpen={setOpen}>
        <CreateTopicForm errors={errors} data={response} />
      </Modal>
    </Page>
  );
}
