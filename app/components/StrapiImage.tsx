import { getStrapiMedia } from "~/utils/api-helpers";

export default function StrapiImage({
  url,
  alt,
  strapiUrl,
  className,
}: {
  url: string;
  alt: string;
  strapiUrl: string;
  className: string;
}) {
  const imageUrl = getStrapiMedia(url, strapiUrl);
  const fullImageUrl = imageUrl ? imageUrl : "https://picsum.photos/200";

  return (
    <img
      className={className}
      src={fullImageUrl}
      width="80"
      alt={alt || "user image"}
    />
  );
}