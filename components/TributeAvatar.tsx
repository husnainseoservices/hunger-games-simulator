'use client';
import { useState } from 'react';

interface TributeAvatarProps {
  src?: string;
  name: string;
  size?: number;
  square?: boolean;
  fontSize?: string;
}

/**
 * Shows a tribute photo if it exists, otherwise falls back
 * to a gold circle with the tribute's first initial.
 */
export default function TributeAvatar({ src, name, size = 48, square = false, fontSize }: TributeAvatarProps) {
  const [err, setErr] = useState(false);
  const radius = square ? '10px' : '50%';
  const initialFont = fontSize || `${Math.round(size * 0.42)}px`;

  if (!src || err) {
    return (
      <div style={{
        width: size, height: size, borderRadius: radius,
        background: 'linear-gradient(135deg,#d4a017,#8b6914)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: initialFont, fontWeight: 900, color: '#0a0c06',
        fontFamily: 'Cinzel, serif', flexShrink: 0,
      }}>
        {name.charAt(0)}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      onError={() => setErr(true)}
      style={{
        width: size, height: size, borderRadius: radius,
        objectFit: 'cover', flexShrink: 0, display: 'block',
        border: '1px solid rgba(212,160,23,0.25)',
      }}
    />
  );
}