import qs from "qs";
import z from "zod";
import { useState } from "react";
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import TopAddButton from "~/components/TopAddButton";
import Modal from "~/components/Modal";

import { Page, Navbar } from "konsta/react";

import BackButton from "~/components/BackButton";
import { getStrapiURL, flattenAttributes } from "~/utils/api-helpers";
import { CreateCommentForm } from "~/components/CreateCommentForm";

const query = qs.stringify({});

export async function loader({ params }: LoaderFunctionArgs) {
  const forumId = params.forumId;
  const strapiUrl = getStrapiURL();

  const url = strapiUrl + "/api/topics/" + forumId + "?" + query;
  const res = await fetch(url);
  const data = await res.json();
  const flattenedData = flattenAttributes(data);
  return json({ ...flattenedData, strapiUrl });
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

  const [open, setOpen] = useState(false);

  return (
    <Page className="pb-16">
      <Navbar
        title={loaderData.title.slice(0, 24) + "..."}
        right={<BackButton />}
      />
      <TopAddButton onClick={setOpen} />

      <Modal open={open} setOpen={setOpen}>
        <CreateCommentForm  />
      </Modal>
    </Page>
  );
}
