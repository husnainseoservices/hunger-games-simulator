import type { Metadata } from 'next';
import { tributes, getTributeById } from '@/data/tributes';
import TributeContent from './TributeContent';

export function generateStaticParams() {
  return tributes.map(t => ({ id: t.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const t = getTributeById(id);
  if (!t) return { title: 'Tribute Not Found' };
  const title = `${t.name}${t.nickname ? ` "${t.nickname}"` : ''} — District ${t.districtNumber} Tribute`;
  const desc = `${t.name} from District ${t.districtNumber}. ${t.background} tribute, weapon: ${t.weapon}. Training score ${t.trainingScore}/12. Full stats, bio, and victory odds in the Hunger Games Simulator.`;
  return {
    title,
    description: desc.slice(0, 160),
    alternates: { canonical: `/tributes/${t.id}` },
    openGraph: { title, description: desc.slice(0, 160), type: 'profile' },
  };
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return <TributeContent params={params} />;
}
