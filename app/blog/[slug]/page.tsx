import type { Metadata } from 'next';
import { blogPosts, getPostBySlug } from '@/data/blog-posts';
import PostContent from './PostContent';

export function generateStaticParams() {
  return blogPosts.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: post.title,
    description: post.excerpt.slice(0, 160),
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt.slice(0, 160),
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: [{ url: post.featuredImage }],
    },
    twitter: { card: 'summary_large_image', title: post.title, description: post.excerpt.slice(0, 160) },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const articleSchema = post ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: { '@type': 'Person', name: post.author },
    publisher: { '@type': 'Organization', name: 'Hunger Games Simulator' },
    image: `https://hungergamessimulators.com${post.featuredImage}`,
  } : null;

  const breadcrumbSchema = post ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://hungergamessimulators.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://hungergamessimulators.com/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://hungergamessimulators.com/blog/${post.slug}` },
    ],
  } : null;

  return (
    <>
      {articleSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />}
      {breadcrumbSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />}
      <PostContent params={params} />
    </>
  );
}
