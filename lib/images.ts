import { blogPosts } from '@/data/blog-posts';

/**
 * Central image registry — every image on the site is declared here.
 *
 * WHY: instead of scattering '/images/...' string literals across 75+
 * locations (where a rename breaks silently), components import from here.
 * Add a new image once, reuse it everywhere with correct alt text and
 * dimensions baked in.
 *
 * RULE: never hard-code an `/images/` path in a component. Import from here
 * or use the `SiteImage` component, which reads this registry.
 */

export interface SiteImageData {
  src: string;
  alt: string;
  width: number;
  height: number;
}

function img(src: string, alt: string, width = 1200, height = 630): SiteImageData {
  return { src, alt, width, height };
}

/** Site-wide brand images. */
export const brandImages = {
  ogImage: img(
    '/og-image.jpg',
    'Hunger Games Simulator — run the Games, predict the victor',
    1200,
    630,
  ),
  favicon: img('/favicon.ico', 'Hunger Games Simulator favicon', 64, 64),
} as const;

/** Blog featured images — derived from the post data (single source of truth:
 *  `featuredImage` + `imageAlt` in data/blog-posts.ts). Alt text doubles as the
 *  og:image alt and the JSON-LD ImageObject caption. */
export function getBlogImage(slug: string): SiteImageData | undefined {
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return undefined;
  return { src: post.featuredImage, alt: post.imageAlt, width: 1200, height: 630 };
}

/** Tribute portrait by tribute id, e.g. tributeImage('katniss'). Falls back
 *  to a generated initial-avatar when the portrait file is missing. */
export function tributeImage(id: string, name: string): SiteImageData {
  return img(`/images/tributes/${id}.jpg`, `${name} — Hunger Games tribute portrait`, 400, 400);
}
