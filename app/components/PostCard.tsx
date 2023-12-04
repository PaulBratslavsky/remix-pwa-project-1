import { Block } from "konsta/react";
import YouTubePlayer from "~/components/YouTubePlayer";

function PostCard({
  post,
}: {
  readonly post: {
    id: string;
    attributes: {
      heading: string;
      videoUrl: string;
      content: string;
    };
  };
}) {
  return (
    <Block key={post.id}>
      <Block strong className="p-4 -mb-4">
        <h2 className="pt-1 font-bold text-xl">{post.attributes.heading}</h2>
      </Block>
      <YouTubePlayer
        key={post.id}
        playerKey={post.id}
        url={post.attributes.videoUrl}
      />
      <Block strong className="p-4 -mt-1">
        <p>{post.attributes.content.slice(0, 144) + "..."}</p>
      </Block>
    </Block>
  );
}

export default function PostCards({ posts }: { posts: any }) {
  if (!posts) return null;
  return (
    <div className="-my-8 w-full">
      {posts.map((post: any) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
