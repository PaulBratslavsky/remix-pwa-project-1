import z from "zod";
import qs from "qs";
import { json, redirect, type MetaFunction } from "@remix-run/node";
import { useEffect, useState } from "react";
import { isValidYouTubeUrl } from "~/utils";
import { flattenAttributes, getStrapiURL } from "~/utils/api-helpers";
import { useLoaderData, useActionData } from "@remix-run/react";
import { userme } from "~/api/auth/userme.server";

import { Page } from "konsta/react";
import Modal from "~/components/Modal";
import BottomMenu from "~/components/BottomMenu";
import CreatePostForm from "~/components/CreatePostForm";
import PostCard from "~/components/PostCard";
import TopAddButton from "~/components/TopAddButton";
import LoadNext from "~/components/LoadNext";

export const meta: MetaFunction = () => {
  return [
    { title: "BJJ & FRIENDS | Home" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

const query = qs.stringify({
  filters: { type: "VIDEO", isPublic: true },
  fields: ["id", "heading", "videoUrl", "content", "createdAt"],

});

export async function loader() {
  const strapiUrl = getStrapiURL();
  const url = strapiUrl + "/api/contents?" + query;
  const res = await fetch(url);
  const data = await res.json();
  const flattenedData = flattenAttributes(data);
  return json(flattenedData);
}


export async function action({ request }: { request: Request }) {
  const strapiUrl = getStrapiURL();
  const user = await userme(request);
  if (!user) return redirect("/login");

  const url = strapiUrl + "/api/contents";
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
      zodErrors: validatedFields.error.flatten().fieldErrors,
      strapiErrors: null,
      message: "Missing Fields. Failed to create post.",
      data: null,
    };
  }

  const payload = {
    ...validatedFields.data,
    userBio: user.bio.id,
    type: "VIDEO",
    isPublic: true,
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.jwt}`,
    },
    body: JSON.stringify({ data: { ...payload } }),
  });

  const responseData = await response.json();

  return json({
    zodErrors: null,
    strapiErrors: null,
    message: "Post created successfully.",
    data: responseData,
  });
}


export default function Index() {
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const [open, setOpen] = useState(false);

  const posts = loaderData.data;
  const meta = loaderData.meta;
  const pageCount = meta?.pagination.pageCount;

  const strapiErrors = actionData?.strapiErrors;
  const zodErrors = actionData?.zodErrors;

  const errors = strapiErrors || zodErrors;
  const response = actionData?.data;

  useEffect(() => {
    if (response !== null) setOpen(false);
  }, [response]);

  return (
    <Page className="pb-24 relative bg-white">
      <TopAddButton onClick={setOpen} />
      <PostCard posts={posts} />
      <LoadNext pageCount={pageCount} onClick={() => alert("Load more")} />
      <BottomMenu />
      <Modal open={open} setOpen={setOpen}>
        <CreatePostForm errors={errors} data={response} />
      </Modal>
    </Page>
  );
}
