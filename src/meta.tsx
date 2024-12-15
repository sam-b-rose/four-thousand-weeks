import { useEffect } from "preact/hooks";

interface DynamicMetaImageProps {
  imageUrl: string;
  title: string;
  description: string;
}

export function DynamicMetaImage({
  imageUrl,
  title,
  description,
}: DynamicMetaImageProps) {
  useEffect(() => {
    // Remove existing og:image meta tags
    const existingOgImageTags = document.querySelectorAll(
      'meta[property="og:image"]',
    );
    existingOgImageTags.forEach((tag) => tag.remove());

    // Create and append new og:image meta tag
    const metaTag = document.createElement("meta");
    metaTag.setAttribute("property", "og:image");
    metaTag.setAttribute("content", imageUrl);
    document.head.appendChild(metaTag);

    // Optionally set other og tags
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", title);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", description);
  }, [imageUrl, title, description]);

  return null;
}
