import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import YouTubePlayer from "~/components/YouTubePlayer";
import { Page, Fab, Card } from "konsta/react";
import { Plus } from "lucide-react";
import Modal from "~/components/Modal";
import BottomMenu from "~/components/BottomMenu";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader() {
  const url = (process.env.API_URL || "http://localhost:1337") + "/api/posts";
  const res = await fetch(url);
  const data = await res.json();
  return json(data);
}

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const posts = data.data;
  console.log(posts);
  const [open, setOpen] = useState(false);

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
        <p>This should be a form</p>
      </Modal>
    </Page>
  );
}
