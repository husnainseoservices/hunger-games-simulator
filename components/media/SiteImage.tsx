import type { CSSProperties } from 'react';
import { colors, radii } from '@/lib/theme';
import type { SiteImageData } from '@/lib/images';

interface SiteImageProps {
  image: SiteImageData;
  /** Rendered size; defaults to the registry dimensions. */
  width?: number;
  height?: number;
  eager?: boolean;
  rounded?: boolean;
  bordered?: boolean;
  style?: CSSProperties;
  className?: string;
}

/**
 * The only <img> wrapper components should use.
 * - alt text is REQUIRED (type-enforced via SiteImageData)
 * - dimensions come from the registry, preventing layout shift
 * - lazy-loads by default; pass eager for above-the-fold heroes
 */
export default function SiteImage({
  image,
  width,
  height,
  eager,
  rounded = true,
  bordered = true,
  style,
  className,
}: SiteImageProps) {
  return (
    <img
      src={image.src}
      alt={image.alt}
      width={width ?? image.width}
      height={height ?? image.height}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : undefined}
      className={className}
      style={{
        display: 'block',
        maxWidth: '100%',
        height: 'auto',
        borderRadius: rounded ? radii.lg : undefined,
        border: bordered ? `1px solid ${colors.border}` : undefined,
        ...style,
      }}
    />
  );
}
