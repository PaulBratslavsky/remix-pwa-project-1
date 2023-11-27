import type { MetaFunction } from "@remix-run/node";
import z from "zod";
import { useEffect, useState } from "react";
import YouTubePlayer from "~/components/YouTubePlayer";
import { Page, Fab, Card, ListButton, List, ListInput } from "konsta/react";
import { Plus } from "lucide-react";
import Modal from "~/components/Modal";
import BottomMenu from "~/components/BottomMenu";
import { useLoaderData, useActionData, Form } from "@remix-run/react";
import { json } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

function isValidYouTubeUrl(url: string) {
  const regex =
    /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/(watch\?v=|embed\/)?[a-zA-Z0-9_-]+$/;
  return regex.test(url);
}

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
  const errors = actionData?.errors;
  const response = actionData?.data;

  useEffect(() => {
    if (response !== null) {
      setOpen(false);
    }
  }, [response]);

  return (
    <Page>
      <h1>Welcome to Remix</h1>
      <Fab
        className="fixed right-4-safe ios:top-15-safe material:top-18-safe z-50 k-color-brand-red"
        icon={
          <div className="flex justify-center items-center mt-[2px]">
            <Plus />
          </div>
        }
        onClick={() => setOpen(true)}
      />
      Copy code
      {posts.map((post: any) => (
        <Card key={post.id}>
          <h2 className="pt-1 text-lg">{post.attributes.heading}</h2>

          <YouTubePlayer
            key={post.id}
            playerKey={post.id}
            url={post.attributes.videoUrl}
          />
          <p className="py-4">
            {post.attributes.content.slice(0, 144) + "..."}
          </p>
        </Card>
      ))}
      <BottomMenu />
      <Modal open={open} setOpen={setOpen}>
        <Form id="create-form" method="post">
          <List strongIos insetIos>
            <ListInput
              name="heading"
              label="Title"
              type="text"
              placeholder="Title"
              error={errors && errors.heading && errors.heading[0]}
            />
            <ListInput
              name="videoUrl"
              label="Video Url"
              type="text"
              placeholder="URL"
              error={errors && errors.videoUrl && errors.videoUrl[0]}
            />
            <ListInput
              name="content"
              label="Short description"
              type="textarea"
              placeholder="Description..."
              inputClassName="!h-20 resize-none"
              error={errors && errors.content && errors.content[0]}
            />
            <div className="mt-4">
              <ListButton type="submit" className="">
                Save
              </ListButton>
            </div>
          </List>
        </Form>
      </Modal>
    </Page>
  );
}
