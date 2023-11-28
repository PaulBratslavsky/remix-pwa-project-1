export function getStrapiURL(path = '') {
  const url = process.env.API_URL || 'http://localhost:1337';
  return url + path;
}

export function getStrapiMedia(imageUrl: string | null, strapiUrl: string) {
  if (imageUrl == null) {
      return null;
  }

  // Return the full URL if the media is hosted on an external provider
  if (imageUrl.startsWith('http') || imageUrl.startsWith('//')) {
      return imageUrl;
  }

  // Otherwise prepend the URL path with the Strapi URL
  return strapiUrl + imageUrl;
}