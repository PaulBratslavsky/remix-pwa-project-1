import YouTubePlayer from "~/components/YouTubePlayer";

function PostCard({
  post,
}: {
  post: {
    id: string;
    attributes: {
      heading: string;
      videoUrl: string;
      content: string;
    };
  };
}) {
  return (
    <div key={post.id} className="p-2">
      <div className="p-4">
        <h2 className="pt-1 font-bold text-xl">{post.attributes.heading}</h2>
      </div>

      <YouTubePlayer
        key={post.id}
        playerKey={post.id}
        url={post.attributes.videoUrl}
      />
      <div className="p-4">
        <p>{post.attributes.content.slice(0, 144) + "..."}</p>
      </div>
    </div>
  );
}

export default function PostCards({ posts }: { posts: any }) {
  if (!posts) return null;
  return (
    <div>
      {posts.map((post: any) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
