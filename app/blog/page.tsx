import type { Metadata } from 'next';
import BlogContent from './BlogContent';

export const metadata: Metadata = {
  title: 'Blog & Guides — Hunger Games Strategy & Analysis',
  description: 'Hunger Games guides, tribute analysis, strategy breakdowns, and arena recaps. Deep dives into Katniss, the Careers, the Quarter Quell, and more.',
  alternates: { canonical: '/blog' },
};

export default function Page() {
  return <BlogContent />;
}
