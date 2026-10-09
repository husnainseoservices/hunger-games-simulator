import type { MetadataRoute } from 'next';
import { blogPosts } from '@/data/blog-posts';
import { tributes } from '@/data/tributes';

const BASE_URL = 'https://hungergamessimulators.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
    },
    {
      url: `${BASE_URL}/simulator`,
    },
    {
      url: `${BASE_URL}/fight`,
    },
    {
      url: `${BASE_URL}/odds`,
    },
    {
      url: `${BASE_URL}/quiz`,
    },
    {
      url: `${BASE_URL}/tributes`,
    },
    {
      url: `${BASE_URL}/districts`,
    },
    {
      url: `${BASE_URL}/leaderboard`,
    },
    {
      url: `${BASE_URL}/blog`,
    },
    {
      url: `${BASE_URL}/simulation-lab`,
    },
    {
      url: `${BASE_URL}/arena-builder`,
    },
    {
      url: `${BASE_URL}/custom-tributes`,
    },
    {
      url: `${BASE_URL}/personality-quiz`,
    },
    {
      url: `${BASE_URL}/best-hunger-games-simulators`,
    },
    {
      url: `${BASE_URL}/about`,
    },
    {
      url: `${BASE_URL}/contact`,
    },
    {
      url: `${BASE_URL}/privacy`,
    },
    {
      url: `${BASE_URL}/terms`,
    },
    {
      url: `${BASE_URL}/sitemap`,
    },
  ];

  const tributeRoutes: MetadataRoute.Sitemap = tributes.map((tribute) => ({
    url: `${BASE_URL}/tributes/${tribute.id}`,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.publishedAt,
  }));

  return [
    ...staticRoutes,
    ...tributeRoutes,
    ...blogRoutes,
  ];
}
