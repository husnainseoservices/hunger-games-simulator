import type { Metadata } from 'next';
import DistrictsContent from './DistrictsContent';

export const metadata: Metadata = {
  title: 'Districts of Panem — Complete District Guide',
  description: 'Explore all 13 districts of Panem plus the Capitol. See wealth levels, Capitol loyalty, industries, past victors, and the tributes from each district.',
  alternates: { canonical: '/districts' },
};

export default function Page() {
  return <DistrictsContent />;
}
