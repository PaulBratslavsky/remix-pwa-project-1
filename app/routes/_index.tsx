import z from "zod";

import { useEffect, useState } from "react";
import { isValidYouTubeUrl } from "~/utils";

import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData, useActionData } from "@remix-run/react";

import { Page } from "konsta/react";

import Modal from "~/components/Modal";
import BottomMenu from "~/components/BottomMenu";
import CreatePostForm from "~/components/CreatePostForm";
import PostCard from "~/components/PostCard";
import TopAddButton from "~/components/TopAddButton";
import LoadNext from "~/components/LoadNext";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function action({ request }: { request: Request }) {
  const url = (process.env.API_URL || "http://localhost:1337") + "/api/posts";
  const formData = await request.formData();

  const formSchema = z.object({
    heading: z.string().min(1),
    videoUrl: z.string().refine(isValidYouTubeUrl, {
      message: "Invalid YouTube URL",
    }),
    content: z.string().min(1),
  });

  const validatedFields = formSchema.safeParse({
    heading: String(formData.get("heading")),
    videoUrl: String(formData.get("videoUrl")),
    content: String(formData.get("content")),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to create post.",
      data: null,
    };
  }

  const data = Object.fromEntries(formData);
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

export async function loader() {
  const url = (process.env.API_URL || "http://localhost:1337") + "/api/posts";
  const res = await fetch(url);
  const data = await res.json();
  return json(data);
}

export default function Index() {
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  const [open, setOpen] = useState(false);
  

  const posts = loaderData.data;
  const meta = loaderData.meta;
  const pageCount = meta?.pagination.pageCount;

  const errors = actionData?.errors;
  const response = actionData?.data;

  useEffect(() => {
    if (response !== null) setOpen(false);
  }, [response]);

  return (
    <Page className="pb-24 relative bg-white">
      <TopAddButton onClick={setOpen} />
      <PostCard posts={posts} />
      <LoadNext pageCount={pageCount} onClick={() => alert("Load more")}/>
      <BottomMenu />
      <Modal open={open} setOpen={setOpen}>
        <CreatePostForm errors={errors} data={response} />
      </Modal>
    </Page>
  );
}

