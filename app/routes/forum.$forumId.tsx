import qs from "qs";
import z from "zod";
import { useState } from "react";
import { json, redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { userme } from "~/api/auth/userme.server";

import TopAddButton from "~/components/TopAddButton";
import Modal from "~/components/Modal";

import { Page, Navbar, Block, BlockTitle, BlockFooter } from "konsta/react";

import BackButton from "~/components/BackButton";
import {
  getStrapiURL,
  flattenAttributes,
  formatDate,
} from "~/utils/api-helpers";
import { CreateCommentForm } from "~/components/CreateCommentForm";

const query = qs.stringify({
  filters: { type: "POST", isPublic: true },
  fields: ["heading", "content", "createdAt"],
  populate: { userBio: { fields: ["name", "belt"] } },
});

export async function loader({ params, request }: LoaderFunctionArgs) {
  const forumId = params.forumId;
  const strapiUrl = getStrapiURL();
  const user = await userme(request);

  const url = strapiUrl + "/api/contents/" + forumId + "?" + query;
  const res = await fetch(url);
  const data = await res.json();
  const flattenedData = flattenAttributes(data);
  flattenedData.user = user;
  flattenedData.strapiUrl = strapiUrl;
  return json(flattenedData);
}

export async function action({ request }: { request: Request }) {
  const strapiUrl = getStrapiURL();
  const user = await userme(request);
  if (!user) return redirect("/login");

  const url = strapiUrl + "/api/comments";
  const formData = await request.formData();

  const formSchema = z.object({
    message: z.string().min(1),
  });

  const validatedFields = formSchema.safeParse({
    message: String(formData.get("message")),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to create comment.",
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

export default function LessonDynamicRoute() {
  const loaderData = useLoaderData<typeof loader>();
  const user = loaderData.user;

  console.log("loaderData", loaderData.userBio);

  const [open, setOpen] = useState(false);

  return (
    <Page className="pb-16">
      <Navbar
        title={loaderData.heading.slice(0, 24) + "..."}
        right={<BackButton />}
      />
      {user && <TopAddButton onClick={setOpen} />}

      <Block strong outline className="mt-0">
        <h2 className="text-lg font-bold mb-4">{loaderData.heading}</h2>
        <p className="mb-2">{loaderData.content}</p>
        <div className="flex justify-between">
        <div className="flex gap-2">
          <span className="font-bold text-slate-500">{loaderData.userBio.name}</span>
          {"-"}
          <span>{loaderData.userBio.belt.toLowerCase() + " belt"}</span>
        </div>
          <span>{formatDate(loaderData.createdAt)}</span>
        </div>
      </Block>

      <Modal open={open} setOpen={setOpen}>
        {/* <CreateCommentForm  /> */}
        <h1>form</h1>
      </Modal>
    </Page>
  );
}
