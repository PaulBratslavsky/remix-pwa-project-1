import qs from "qs";
import z from "zod";
import { useState, useEffect } from "react";
import { userme } from "~/api/auth/userme.server";
import { json, redirect } from "@remix-run/node";
import { useLoaderData, useActionData } from "@remix-run/react";
import { getStrapiURL } from "~/utils/api-helpers";

import { Page, Navbar } from "konsta/react";
import BackButton from "~/components/BackButton";
import TopicsList from "~/components/TopicsList";
import Modal from "~/components/Modal";
import CreateTopicForm from "~/components/CreateTopicForm";
import TopAddButton from "~/components/TopAddButton";

const query = qs.stringify({
  fields: ["title", "description", "public", "createdAt"],
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

export async function action({ request }: { request: Request }) {
  const user = await userme(request);
  if (!user) return redirect("/login");

  const url = (process.env.API_URL || "http://localhost:1337") + "/api/topics";
  const formData = await request.formData();

  const formSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
  });

  const validatedFields = formSchema.safeParse({
    title: String(formData.get("title")),
    description: String(formData.get("description")),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to create post.",
      data: null,
    };
  }

  const data = Object.fromEntries(formData);
  data.user_bio = user.bio.id;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: { ...data } }),
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
